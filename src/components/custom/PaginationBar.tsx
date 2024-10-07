"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/lib/hook/searchParams";

type Props = {
  totalCount: number;
};
export default function PaginationBar({ totalCount }: Props) {
  const router = useRouter();
  const [{ page, size }, searchParams] = usePagination();
  const pathname = usePathname();

  const totalPages = Math.max(Math.ceil(totalCount / size), 1);
  const maxPages = 7;
  const halfMaxPages = Math.floor(maxPages / 2);
  const canPageBackwards = page > 1;
  const canPageForwards = page < totalPages;
  const pageNumbers = [] as Array<number>;
  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = page - halfMaxPages;
    let endPage = page + halfMaxPages;
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }
    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }
  const existingParams = Array.from(searchParams.entries()).filter(([key]) => {
    return key !== "page";
  });

  return (
    <Pagination>
      {existingParams.map(([key, value]) => {
        return <input key={key} type="hidden" name={key} value={value} />;
      })}

      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (Number(page) > 1) {
                router.push(`${pathname}?page=${page - 1}&size=${size}`);
              }
            }}
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => {
          const isCurrentPage = pageNumber === page;
          return (
            <PaginationItem key={pageNumber} aria-disabled={isCurrentPage}>
              <PaginationLink
                onClick={() => {
                  router.push(`${pathname}?page=${pageNumber}&size=${size}`);
                }}
                isActive={isCurrentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (Number(page) < pageNumbers.length) {
                router.push(`${pathname}?page=${page + 1}&size=${size}`);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
