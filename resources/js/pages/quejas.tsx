//** Hooks  */
import { Head } from '@inertiajs/react';
//** Components  */
import { columnasQuejas } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import { type BreadcrumbItem } from '@/types';
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quejas',
        href: '/quejas',
    },
];

export default function Quejas({ buzon = [] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quejas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Quejas" subtitle="Revisa las quejas que se han generado y los datos historicos que se tienen registrados." />
                <DataTable
                    columns={columnasQuejas}
                    data={buzon}
                    placeholderFilter='Buscar folio...'
                    filter='folio'
                />
            </div>
        </AppLayout>
    );
}