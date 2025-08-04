"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input"
import { Link } from "@inertiajs/react"
import { useState } from "react"
import { Plus } from "lucide-react"
import Encabezados from "./encabezados"
import { title } from "process"
import { Pagination } from "../pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  placeholderFilter: string;
  filter: string;
  encabezado?: boolean;
  titulo?: string;
  subtitle?: string;
  resourceName?: string;
  pagination?: boolean;
  labelButton?: string;
}

export function DataTable<TData, TValue>({ columns, data, placeholderFilter, filter, encabezado = false, titulo = "", subtitle = "", resourceName = "", pagination = true, labelButton = "Agregar Opción"}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className="flex flex-col gap-4 border p-6 rounded-xl shadow-2xs bg-card">
      {encabezado && <Encabezados title={titulo} subtitle={subtitle} />}
      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <Input
          placeholder={placeholderFilter}
          value={(table.getColumn(`${filter}`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`${filter}`)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {resourceName && (
          <Link
            href={route(`${resourceName}.create`)}
            className=" px-3 py-1 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded flex flex-row items-center gap-1"
          >
            <Plus size={16} /> {labelButton}
          </Link>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="w-auto">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-auto">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <Pagination table={table} />
      )}
    </div>
  )
}