//** Hooks  */
import { Head } from '@inertiajs/react';
import { useCan } from '@/hooks/useCan';
//** Components  */
import { ColumnaUsuarios } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
//** Lib or Utils */
import { ConfirmProvider } from '@/Providers/ConfirmProvider';
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
];

export default function ListaUsuarios({ users = [] }: { users: [] }) {
    const { has } = useCan();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezados title="Lista de Usuarios" subtitle="Revisa los diferentes usuarios que tengan acceso al sistema." />
                <ConfirmProvider>
                    {has('ver.usuarios') && (
                        <DataTable
                            columns={ColumnaUsuarios}
                            data={users}
                            resourceName="usuarios"
                            labelButton="Agrega Usuario"
                            placeholderFilter="Buscar por nombre..."
                            filter="nombre"
                        />
                    )}
                </ConfirmProvider>
            </div>
        </AppLayout>
    );
}
