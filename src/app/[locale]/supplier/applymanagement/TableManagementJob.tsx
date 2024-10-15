"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Work } from "@/lib/models/Work";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatRelativeTimeFromNow } from "@/lib/utils/dates";
import dynamic from "next/dynamic";

const RowManagementJobNoSsr = dynamic(() => import("./RowManagementJob"), {
  ssr: false,
});
interface DataTableProps<Work> {
  data: Work[];
}
const columnHelper = createColumnHelper<Work>();

function TableManagementJob<TData>({ data }: DataTableProps<Work>) {
  const t = useTranslations();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
      }),
      columnHelper.accessor("id", {
        header: "ID",
        enableColumnFilter: false,
      }),
      columnHelper.accessor("title", {
        header: "Title",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("position.jobPositionName", {
        header: "Position",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("salary", {
        header: "Salary",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("experience", {
        header: "Experience",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("type.jobTypeName", {
        header: "Job's Type",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("expiredDate", {
        header: "Expired Date",
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ row }) => {
          const expiredDateArray: any = row.original.expiredDate;

          const expiredDate = new Date(expiredDateArray);

          const formatted = formatRelativeTimeFromNow(expiredDate);

          return formatted;
        },
      }),
      columnHelper.display({
        id: "actions",
      }),
    ],
    [t]
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table className="w-full table-auto">
          <TableHeader className="text-left bg-muted/50 w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="w-full">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-left">
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <RowManagementJobNoSsr
                    row={row}
                    key={row.getValue<string>("id")}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TableManagementJob;
