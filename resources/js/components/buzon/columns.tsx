import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { Link, router } from "@inertiajs/react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnaCatalogo = {
    id: number;
    nombre: string
}

function handleDelete(id:number){
    if(confirm("Estas seguro de eliminar el dato?")){
        router.delete(route('catalogos.destroy', id))
    }
}

export const columnasCatalogo: ColumnDef<ColumnaCatalogo>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <div className="w-4">
                    <Button
                        className="flex"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID del Catalogo
                        <ArrowUpDown />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="lowercase pl-3"><span>{row.getValue('id')}</span></div>
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre del Catalogo
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3"><span>{row.getValue('nombre')}</span></div>
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex flex-row justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            size="icon"
                        >
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem ><Link href={route('catalogos.edit', row.original.id)}>Editar</Link></DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.original.id)}>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }
]