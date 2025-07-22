import { columnasQuejas } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function Dashboard({ buzon=[] }) {

    console.log('ESTA ES LA INFO', buzon)

    //TODO: Realizar CRUD de opciones, dependiendo su catalogo
    //TODO: Realizar CRUD para la vista de usuarios, 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Encabezados title="Dashboard" subtitle="Revisa las quejas que se han genero y los datos estadisticos historicos." />

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        AQUI VA UNA GRAFICA
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        aQUI VA OTRA GRAFICA
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        aqui tmb va otra
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable
                        columns={columnasQuejas}
                        data={buzon}
                        placeholderFilter='Buscar folio...'
                        filter='folio'
                    />
                </div>
            </div>
        </AppLayout>
    );
}
