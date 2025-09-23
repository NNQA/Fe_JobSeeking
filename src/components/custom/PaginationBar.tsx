"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils/utils";
import { parseAsIndex, useQueryState } from "nuqs";

type Props = {
  totalElement: number;
  className?: string;
  totalPages: number;
};

export default function PaginationBar({ totalElement, className, totalPages }: Props) {
  const [page, setPage] = useQueryState("page", parseAsIndex.withDefault(0).withOptions({
    shallow: false
  }))

  const maxPages = 7;
  const halfMaxPages = Math.floor(maxPages / 2);

  const canPageBackwards = page > 0;
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
  console.log(pageNumbers)
  console.log(page)
  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:no-underline"
            aria-disabled={!canPageBackwards}
            onClick={() => {
              if (canPageBackwards) {
                setPage(page - 1)
              }
            }}
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => {
          const isCurrentPage = pageNumber === page + 1;
          return (
            <PaginationItem key={pageNumber} aria-disabled={isCurrentPage} className="no-underline">
              <PaginationLink
                onClick={() => {
                  console.log(pageNumber)
                  setPage(pageNumber - 1)
                }}
                isActive={isCurrentPage}
                className="hover:no-underline"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            className="hover:no-underline"
            onClick={() => {
              if (canPageForwards) {
                setPage(page + 1)
              }
            }}

            aria-disabled={true}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
