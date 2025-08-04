import { ColumnaUsuarios } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
];

//TODO: HACER QUE EL USUARIO QUE TENGA ROL DE ADMINISTRADOR PUEDA VER ESTA VISTA
export default function ListaUsuarios({ users=[]}:{ users : []}) {
    console.log(users)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto ">
                <Encabezados title="Lista de Usuarios" subtitle='Revisa los diferentes usuarios que tengan acceso al sistema.' />
                <DataTable
                    columns={ColumnaUsuarios}
                    data={users}
                    resourceName="usuarios"
                    labelButton='Agrega Usuario'
                    placeholderFilter='Buscar por nombre...'
                    filter='nombre'
                />
            </div>
        </AppLayout>
    )
}
