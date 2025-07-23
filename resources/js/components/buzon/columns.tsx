import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { ArrowUpDown, CircleCheck, EllipsisVertical, Loader } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnaCatalogo = {
    id: number;
    nombre: string
}

function handleDelete(id: number) {
    if (confirm("Estas seguro de eliminar el dato?")) {
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

export type ColumnaQueja = {
    nombre: string;
    correo: string;
    tel: string;
    tipo_violencia: string;
    folio: string;
    mensaje: string;
}

export const columnasQuejas: ColumnDef<ColumnaQueja>[] = [
    {
        accessorKey: "folio",
        header: ({ column }) => {
            return (
                <Button
                    className="flex"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Folio
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="uppercase pl-3"><span>{row.getValue('folio')}</span></div>
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre de la victima
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3"><span>{row.getValue('nombre')}</span></div>
    },
    {
        accessorKey: "correo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Correo
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3"><span>{row.getValue('correo')}</span></div>
    },
    {
        accessorKey: "tel",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    No. Telefonico
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3"><span>{row.getValue('tel')}</span></div>
    },
    {
        accessorKey: "tipo_violencia",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo de violencia
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3 uppercase"><span>{row.getValue('tipo_violencia')}</span></div>
    },
    {
        accessorKey: "mensaje",
        header: () => {
            return (
                <div>Queja</div>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3"><span>{row.getValue('mensaje')}</span></div>
    }
]

export type ColumnaOpcion = {
    id: number;
    nombre: string;
    estatus: string;
}

export const columnasOpciones: ColumnDef<ColumnaOpcion>[] = [
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre de opción
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="w-full pl-3"><span>{row.getValue('nombre')}</span></div>
    },
    {
        accessorKey: "estatus",
        header: "Estatus de Opción",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.estatus === "1" ? (
                    <>
                        <CircleCheck className="fill-green-500 dark:fill-green-400" />
                        Activo
                    </>
                ) : (
                    <>
                        <Loader />
                        Desactivado
                    </>
                )}
            </Badge>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { props } = usePage<{ resourceName?: string;}>();
            const resourceName = props.resourceName;

            return (
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
                            <DropdownMenuItem ><Link href={route(`${resourceName}.edit`, row.original.id)}>Editar</Link></DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.original.id)}>Borrar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]