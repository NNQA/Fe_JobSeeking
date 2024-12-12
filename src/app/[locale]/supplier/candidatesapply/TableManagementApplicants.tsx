"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { compareExpiryDate, getExpiryStatus } from "@/lib/utils/dates";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isBefore, parseISO } from "date-fns";
import { Applicant } from "@/lib/models/Applicant";
import { Input } from "@/components/ui/input";

const RowManagementApplicantNoSsr = dynamic(
  () => import("./RowManagementApplicant"),
  {
    ssr: false,
  }
);
interface DataTableProps<Work> {
  data: Applicant[];
}
const columnHelper = createColumnHelper<Applicant>();
function TableManagementApplicants<TData>({ data }: DataTableProps<Applicant>) {
  const t = useTranslations();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
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
      columnHelper.accessor("user.name", {
        header: "User's Name",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("job.title", {
        header: "Title",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("job.position.jobPositionName", {
        header: "Position",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("job.experience", {
        header: "Experience",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("job.type.jobTypeName", {
        header: "Type",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("updatedDateTime", {
        header: "Status",
        enableSorting: true,
        enableColumnFilter: true,
        // filterFn: filterFns.expiryStatus,
        cell: ({ row }) => {
          const expiredDateArray: any =
            row.original.createdDateTime ?? row.original.updatedDateTime;

          const compareDateOfJob: any = row.original.job.expiredDate;

          const status = compareExpiryDate(expiredDateArray, compareDateOfJob);

          return (
            <Badge
              variant={
                status === "Active"
                  ? "default"
                  : status === "Upcoming"
                  ? "secondary"
                  : "destructive"
              }
            >
              {status}
            </Badge>
          );
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
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <div>
      <div className="flex items-center py-4 w-[300px]">
        <Input
          placeholder="Filter user name..."
          value={
            (table.getColumn("user_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("user_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

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
                  <RowManagementApplicantNoSsr
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

export default TableManagementApplicants;
