import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    numberFiles?: boolean
}

export function Pagination<TData>({ table, numberFiles = true }: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-4 mt-4">
            {numberFiles && (
                <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                    {table.getFilteredRowModel().rows.length} Queja(s) generadas.
                </div>
            )}
            <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 lg:flex">
                    <label htmlFor="rows-per-page" className="text-sm font-medium">
                        Filas por página
                    </label>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="w-20" id="rows-per-page">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Ir a la primera página</span>
                        <ChevronsLeftIcon />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Anterior</span>
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Siguiente</span>
                        <ChevronRightIcon />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 lg:flex"
                        size="icon"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Ir a la última página</span>
                        <ChevronsRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}
