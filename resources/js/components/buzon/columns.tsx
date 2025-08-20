import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CircleCheck, EllipsisVertical, Loader, LoaderCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { can } from '@/lib/can';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnaCatalogo = {
    id: number;
    nombre: string;
};

function handleDelete(id: number, resourceName: string) {
    if (confirm('¿Estas seguro de eliminar el dato?')) {
        router.delete(route(`${resourceName}.destroy`, id));
    }
}
function handleDeleteUser(id: number) {
    if (confirm('¿Estas seguro de eliminar el usuario?')) {
        router.delete(route('usuarios.destroy', id));
    }

}
function handleDeleteRol(id: number) {
    if (confirm('¿Estas seguro de eliminar el rol?')) {
        router.delete(route('roles.destroy', id));
    }
}


export const columnasCatalogo: ColumnDef<ColumnaCatalogo>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <div className="w-4">
                    <Button className="flex" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        ID del Catalogo
                        <ArrowUpDown />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => (
            <div className="pl-3 lowercase">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre del Catalogo
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('nombre')}</span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <>
                {(can('editar.catalogos') || can('eliminar.catalogos')) && (
                    <div className="flex flex-row justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                    <EllipsisVertical />
                                    <span className="sr-only">Opciones</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                {can('editar.catalogos') && (
                                    <DropdownMenuItem>
                                        <Link href={route('catalogos.edit', row.original.id)} className="w-full">
                                            Editar
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                {can('eliminar.catalogos') && <DropdownMenuItem variant="destructive">Borrar</DropdownMenuItem>}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </>
        ),
    },
];

export type ColumnaQueja = {
    id: number;
    nombre: string;
    correo: string;
    tel: string;
    tipo_violencia: string;
    folio: string;
    mensaje: string;
    estatus: string;
};

export const columnasQuejas: ColumnDef<ColumnaQueja>[] = [
    {
        accessorKey: 'folio',
        header: ({ column }) => {
            return (
                <Button className="flex" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Folio
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="pl-3 uppercase">
                <span>{row.getValue('folio')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre de la victima
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('nombre')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'correo',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Correo
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('correo')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'tel',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    No. Telefonico
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('tel')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'estatus',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Estatus
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const estatus = row.original.estatus;

            // Puedes usar colores diferentes para cada estatus si quieres
            let icon = null;
            let text = null;
            let badgeClass = 'text-muted-foreground px-1.5';

            if (estatus === 'atendido') {
                icon = <CircleCheck className="fill-green-600 text-green-300 dark:fill-green-700" />;
                text = <p className="text-green-700 dark:text-green-500">Atendido</p>;
                badgeClass += ' border-green-600 bg-status-card'; // Puedes agregar más clases
            } else if (estatus === 'en-curso') {
                icon = <LoaderCircle className="animate-spin text-yellow-500" />;
                text = <p className="text-yellow-500">En Curso</p>;
                badgeClass += ' border-yellow-500 text-yellow-600 bg-status-card';
            } else {
                icon = <Loader />;
                text = <p>Pendiente</p>;
                badgeClass += ' border-neutral-500 bg-status-card';
            }

            return (
                <Badge variant="outline" className={badgeClass}>
                    {icon} {text}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'tipo_violencia',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Tipo de violencia
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3 uppercase">
                <span>{row.getValue('tipo_violencia')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'mensaje',
        header: () => {
            return <div>Queja</div>;
        },
        cell: ({ row }) => (
            <div className="max-w-[120px] truncate pl-3">
                <span>{row.getValue('mensaje')}</span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <>
                    {can('editar.quejas') && (
                        <div className="flex flex-row justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                        <EllipsisVertical />
                                        <span className="sr-only">Opciones</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32">
                                    <DropdownMenuItem>
                                        {can('editar.quejas') && (
                                            <Link href={route('editar-queja', row.original.id)} className="w-full">
                                                Editar
                                            </Link>
                                        )}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </>
            );
        },
    },
];

export type ColumnaOpcion = {
    id: number;
    nombre: string;
    estatus: string;
};

type RowData = { id: number };

function ActionsCell({ row }: { row: { original: RowData } }) {
    const { props } = usePage<{ resourceName?: string }>();
    const resourceName = props.resourceName;
    return (
        <>
            {(can('editar.opciones') || can('eliminar.opciones')) && (
                <div className="flex flex-row justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                <EllipsisVertical />
                                <span className="sr-only">Opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {can('editar.opciones') && (
                                <DropdownMenuItem>
                                    <Link href={route(`${resourceName}.edit`, row.original.id)} className="w-full">
                                        Editar
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {can('eliminar.opciones') && (
                                <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.original.id, resourceName ?? '')}>
                                    Borrar
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </>
    );
}

export const columnasOpciones: ColumnDef<ColumnaOpcion>[] = [
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre de opción
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('nombre')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'estatus',
        header: 'Estatus de Opción',
        cell: ({ row }) => {
            const estatus = row.original.estatus;

            // Puedes usar colores diferentes para cada estatus si quieres
            let icon = null;
            let text = null;
            let badgeClass = 'text-muted-foreground px-1.5';

            if (estatus === '1') {
                icon = <CircleCheck className="fill-green-600 text-green-300 dark:fill-green-700" />;
                text = <p className="text-green-700 dark:text-green-500">Activado</p>;
                badgeClass += ' border-green-600 bg-status-card'; // Puedes agregar más clases
            } else {
                icon = <Loader />;
                text = <p>Desactivado</p>;
                badgeClass += 'border-neutral-500 bg-status-card';
            }

            return (
                <Badge variant="outline" className={badgeClass}>
                    {icon} {text}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionsCell row={row} />,
    },
];

export type ColumnaUsuario = {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
};

export const ColumnaUsuarios: ColumnDef<ColumnaUsuario>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Identificador
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Usuario
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('nombre')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'correo',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Correo
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('correo')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'rol',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Rol
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3 uppercase">
                <span>{row.getValue('rol')}</span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="flex flex-row justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>
                            <Link href={route('usuarios.edit', row.original.id)} className="w-full">
                                Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => handleDeleteUser(row.original.id)}>
                            Borrar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];

export type PermissionItem = {
  id: number;
  name: string;
  // ...otros campos que vengan (guard_name, etc.)
};

export type ColumnaRol = {
    id: number;
    name: string;
  permissions: PermissionItem[]; // <- importante: array tipado
};

export const ColumnaRoles: ColumnDef<ColumnaRol>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Identificador
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre del Rol
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('name')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'permissions',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Permisos
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            // row.getValue('permissions') es unknown → casteamos
            const perms = row.getValue('permissions') as PermissionItem[] | string[];

            // Soporta ambos casos: array de objetos o de strings
            const names = Array.isArray(perms) ? perms.map((p) => (typeof p === 'string' ? p : p.name)) : [];

            return (
                <div className="flex flex-wrap w-full pl-3 gap-6">
                    {names.map((name) => (
                        <Badge key={name} variant="default">
                            {name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="flex flex-row justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>
                            <Link href={route('roles.edit', row.original.id)} className="w-full">
                                Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => handleDeleteRol(row.original.id)}>
                            Borrar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];
