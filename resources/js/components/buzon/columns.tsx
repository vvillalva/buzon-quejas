import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCan } from '@/hooks/useCan';
import { useConfirm } from '@/Providers/ConfirmProvider';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CircleCheck, EllipsisVertical, Loader, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
type RowData = { id: number };

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnaCatalogo = {
    id: number;
    nombre: string;
};

// function handleDelete(id: number, resourceName: string) {
//     if (confirm('¿Estas seguro de eliminar el dato?')) {
//         router.delete(route(`${resourceName}.destroy`, id));
//     }
// }
// function handleDeleteUser(id: number) {
//     if (confirm('¿Estas seguro de eliminar el usuario?')) {
//         router.delete(route('usuarios.destroy', id));
//     }
// }
// function handleDeleteRol(id: number) {
//     if (confirm('¿Estas seguro de eliminar el rol?')) {
//         router.delete(route('roles.destroy', id));
//     }
// }

function ActionsCellCatalogo({ row }: { row: { original: RowData } }) {
    const { has, hasAny } = useCan();
    return (
        <>
            {hasAny(['editar.catalogos', 'eliminar.catalogos']) && (
                <div className="flex flex-row justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                <EllipsisVertical />
                                <span className="sr-only">Opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {has('editar.catalogos') && (
                                <DropdownMenuItem>
                                    <Link href={route('catalogos.edit', row.original.id)} className="w-full">
                                        Editar
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {has('eliminar.catalogos') && <DropdownMenuItem variant="destructive">Borrar</DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </>
    );
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
        cell: ({ row }) => <ActionsCellCatalogo row={row} />,
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

function ActionsCellQuejas({ row }: { row: { original: RowData } }) {
    const { has, hasAny } = useCan();
    return (
        <>
            {hasAny(['editar.quejas', 'ver.quejas']) && (
                <div className="flex flex-row justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                <EllipsisVertical />
                                <span className="sr-only">Opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {has('editar.quejas') && (
                                <DropdownMenuItem>
                                    <Link href={route('editar-queja', row.original.id)} className="w-full">
                                        Editar
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                                <Link href={route('ver-queja', row.original.id)} className="w-full">
                                    Ver detalles
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </>
    );
}

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
        cell: ({ row }) => <ActionsCellQuejas row={row} />,
    },
];

export type ColumnaOpcion = {
    id: number;
    nombre: string;
    estatus: string;
};

function ActionsCell({ row }: { row: { original: RowData } }) {
    const { has, hasAny } = useCan();
    const { props } = usePage<{ resourceName?: string }>();
    const resourceName = props.resourceName;
    //**Configuración para modal */
    const confirm = useConfirm();

    const [menuOpen, setMenuOpen] = useState(false);

    const onDeleteClick = async () => {
        // 1) cierra el dropdown primero para evitar conflictos de foco
        setMenuOpen(false);
        // 2) espera a que termine el ciclo de cierre
        await new Promise((r) => requestAnimationFrame(r));
        // 3) abre el confirm global (no se desmonta aunque se borre la fila)
        const ok = await confirm({
            title: '¿Desea eliminar esta opción?',
            description: '¿Estás seguro de eliminar este registro? Ya no podrás recuperar este registro ni sus datos relacionados.',
            actionText: 'Eliminar',
            cancelText: 'Cancelar',
            destructive: true,
        });
        if (!ok) return;
        // 4) dispara la eliminación en el siguiente frame (dropdown/confirm ya cerrados)
        requestAnimationFrame(() => {
            router.delete(route(`${resourceName}.destroy`, row.original.id), {
                preserveScroll: true,
            });
        });
    };

    return (
        <>
            {hasAny(['editar.opciones', 'eliminar.opciones']) && (
                <div className="flex flex-row justify-end">
                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                <EllipsisVertical />
                                <span className="sr-only">Opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {has('editar.opciones') && (
                                <DropdownMenuItem>
                                    <Link href={route(`${resourceName}.edit`, row.original.id)} className="w-full">
                                        Editar
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {has('eliminar.opciones') && (
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        onDeleteClick();
                                    }}
                                >
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

function ActionsCellUsuarios({ row }: { row: { original: RowData } }) {
    const { has } = useCan();

    //**Configuración para modal */
    const confirm = useConfirm();

    const [menuOpen, setMenuOpen] = useState(false);

    const onDeleteClick = async () => {
        // 1) cierra el dropdown primero para evitar conflictos de foco
        setMenuOpen(false);
        // 2) espera a que termine el ciclo de cierre
        await new Promise((r) => requestAnimationFrame(r));
        // 3) abre el confirm global (no se desmonta aunque se borre la fila)
        const ok = await confirm({
            title: '¿Desea eliminar a este usuario?',
            description: '¿Estás seguro de eliminar a este usuario? Ya no podrás recuperar la información relacionada con el usuario.',
            actionText: 'Eliminar',
            cancelText: 'Cancelar',
            destructive: true,
        });
        if (!ok) return;
        // 4) dispara la eliminación en el siguiente frame (dropdown/confirm ya cerrados)
        requestAnimationFrame(() => {
            router.delete(route('usuarios.destroy', row.original.id), {
                preserveScroll: true,
            });
        });
    };
    return (
        <>
            {(has('editar.usuarios') || has('eliminar.usuarios')) && (
                <div className="flex flex-row justify-end">
                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                <EllipsisVertical />
                                <span className="sr-only">Opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {has('editar.usuarios') && (
                                <DropdownMenuItem>
                                    <Link href={route('usuarios.edit', row.original.id)} className="w-full">
                                        Editar
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {has('eliminar.usuarios') && (
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        onDeleteClick();
                                    }}
                                >
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
        cell: ({ row }) => <ActionsCellUsuarios row={row} />, // Reutilizamos la función ActionsCellUsuarios
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

function ActionsCellRoles({ row }: { row: { original: RowData } }) {
    const { has, hasAny } = useCan();
    //**Configuración para modal */
    const confirm = useConfirm();
    const [menuOpen, setMenuOpen] = useState(false);
    const onDeleteClick = async () => {
        // 1) cierra el dropdown primero para evitar conflictos de foco
        setMenuOpen(false);
        // 2) espera a que termine el ciclo de cierre
        await new Promise((r) => requestAnimationFrame(r));
        // 3) abre el confirm global (no se desmonta aunque se borre la fila)
        const ok = await confirm({
            title: '¿Desea eliminar este Rol?',
            description: 'Al eliminar este rol cualquier usuario que tenga relación con el rol perdera de sus privilegios dentro del sistema.',
            actionText: 'Eliminar',
            cancelText: 'Cancelar',
            destructive: true,
        });
        if (!ok) return;
        // 4) dispara la eliminación en el siguiente frame (dropdown/confirm ya cerrados)
        requestAnimationFrame(() => {
            router.delete(route('roles.destroy', row.original.id), {
                preserveScroll: true,
            });
        });
    };
    return (
        <>
            {hasAny(['editar.roles', 'eliminar.roles']) && (
                <div className="flex flex-row justify-end">
                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                                <EllipsisVertical />
                                <span className="sr-only">Opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {has('editar.roles') && (
                                <DropdownMenuItem>
                                    <Link href={route('roles.edit', row.original.id)} className="w-full">
                                        Editar
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {has('eliminar.roles') && (
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        onDeleteClick();
                                    }}
                                >
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
                <div className="flex w-full flex-wrap gap-6 pl-3">
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
        cell: ({ row }) => <ActionsCellRoles row={row} />,
    },
];
