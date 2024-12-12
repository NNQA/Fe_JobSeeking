import React, { useRef, useState } from "react";
import { Row as TRow } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, XCircleIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import ProgressCircle from "@/components/svg/ProgressCircle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Applicant } from "@/lib/models/Applicant";
interface Props {
  row: TRow<Applicant>;
}
function RowManagementApplicant({ row }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isDeletingId = row.getValue<string>("id");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  // const deletingWithId = async () => {
  //   setIsSubmitting(false);
  //   const result = await deleteJobWithId(row.getValue<string>("id"));
  //   setIsSubmitting(true);
  //   if (result?.status === "ok") {
  //     toast({
  //       variant: "success",
  //       title: "Success",
  //       description: "You update your successfully",
  //     });
  //     router.refresh();
  //   } else {
  //     toast({
  //       variant: "destructive",
  //       title: "Failure",
  //       description: result?.message,
  //     });
  //   }
  // };
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      <TableCell key="select">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </TableCell>
      {row.getVisibleCells().map((cell) => {
        const cellValue = cell.getValue();
        if (cellValue === null || cellValue === undefined || cellValue === "") {
          return null;
        }
        if (cell.column.id === "job_title") {
          return (
            <TableCell
              key={cell.id}
              className="px-4 py-2 text-card-foreground/70 font-medium max-w-[200px] truncate"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          );
        }
        return (
          <TableCell
            key={cell.id}
            className="px-4 py-2 font-medium text-card-foreground/70"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}

      <TableCell key={"action"}>
        <div className="flex items-center gap-2 w-max">
          <Button asChild variant={"link"}>
            <Link
              href={`${pathname}/${row.getValue<string>(
                "id"
              )}/${encodeURIComponent(row.getValue<string>("user_name"))}`}
            >
              <Pencil className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default RowManagementApplicant;
