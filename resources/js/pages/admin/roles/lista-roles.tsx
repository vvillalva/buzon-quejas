//** Hooks  */
import { Head } from '@inertiajs/react';
//** Components  */
import { ColumnaRoles } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
//** Lib or Utils */
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function ListaRoles({ roles = [] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto ">
                <Encabezados title="Lista de Roles" subtitle='Revisa los diferentes roles que existen dentro del sistema con sus privilegios' />
                <DataTable
                    columns={ColumnaRoles}
                    data={roles}
                    resourceName="roles"
                    labelButton='Agrega Rol'
                    placeholderFilter='Buscar por nombre...'
                    filter='name'
                />
            </div>
        </AppLayout>
    )
}
