import React, { useRef, useState } from "react";
import { Row as TRow } from "@tanstack/react-table";
import { Work } from "@/lib/models/Work";
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
import { deleteJobWithId } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import ProgressCircle from "@/components/svg/ProgressCircle";

interface Props {
  row: TRow<Work>;
}
function RowManagementJob({ row }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isDeletingId = row.getValue<string>("id");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const deletingWithId = async () => {
    setIsSubmitting(false);
    const result = await deleteJobWithId(row.getValue<string>("id"));
    setIsSubmitting(true);
    if (result?.status === "ok") {
      toast({
        variant: "success",
        title: "Success",
        description: "You update your successfully",
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Failure",
        description: result?.message,
      });
    }
  };
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
            <Link href={`${pathname}/${row.getValue<string>("id")}`}>
              <Pencil className="w-5 h-5" />
            </Link>
          </Button>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
              <Button
                variant={"destructive"}
                className="bg-transparent text-destructive hover:bg-transparent focus:bg-transparent"
              >
                <XCircleIcon className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 flex flex-col gap-5 justify-center">
              <p className="text-xs font-medium w-full text-destructive/90">
                Are you sure to delete this department?
              </p>
              <div className="flex gap-2">
                <Button
                  variant={"outlineVariant"}
                  className="w-full h-8"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={"destructive"}
                  className="w-full h-8 relative"
                  onClick={() => deletingWithId()}
                >
                  <span
                    className={clsx("block transition ease-in-out", {
                      "opacity-0": isSubmitting,
                      "scale-0": isSubmitting,
                    })}
                  >
                    Delete
                  </span>

                  <Transition
                    show={isSubmitting}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0 scale-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0 scale-0"
                  >
                    <div className="w-[50%] h-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <ProgressCircle
                        className="text-primary-500"
                        aria-label="signing in"
                      />
                    </div>
                  </Transition>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default RowManagementJob;
