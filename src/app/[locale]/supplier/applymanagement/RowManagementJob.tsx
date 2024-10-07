import React, { useRef, useState } from "react";
import { Row as TRow } from "@tanstack/react-table";
import { Work } from "@/lib/models/Work";
import { useTranslations } from "next-intl";
import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, XCircleIcon } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  row: TRow<Work>;
}
function RowManagementJob({ row }: Props) {
  const t = useTranslations();
  const isDeletingId = row.getValue<string>("id");
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  console.log(isDeletingId);
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
          return null; // Skip rendering this cell if value is empty
        }

        return (
          <TableCell key={cell.id} className="px-4 py-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}

      <TableCell key={"action"}>
        <div className="flex items-center gap-2 w-max">
          <Button asChild variant={"link"}>
            <Link href={"/asdklasjd"}>
              <Pencil className="w-5 h-5" />
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button
                variant={"destructive"}
                className="bg-transparent text-destructive hover:bg-transparent focus:bg-transparent"
              >
                <XCircleIcon className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-3 flex flex-col  items-center gap-5 text-center justify-center">
              <div className="flex items-center w-[80%] gap-5 text-center justify-center">
                <p className="text-base font-medium  text-left">
                  Are you sure to delete this department?
                </p>
                <p className="text-base font-medium pb-6">x</p>
              </div>
              <div className="flex justify-between w-[80%]">
                <Button variant={"destructive"}>Delete</Button>
                <Button variant={"outlineVariant"}>Cancel</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default RowManagementJob;
