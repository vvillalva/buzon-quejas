import ChartDashboard from '@/components/buzon/chart-dashboard';
import { columnasQuejas } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import { SectionCards } from '@/components/section-cards';
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
    //TODO: CONFIGURAR BIEN LOS DATOS ESTADISTICOS, investigar que datos estadisticos conviene sacar
    //TODO: Realizar CRUD para la vista de usuarios, 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Encabezados title="Dashboard" subtitle="Revisa las quejas que se han genero y los datos estadisticos historicos." />
                <div className="@container/main flex flex-1 flex-col gap-4">
                    <SectionCards />
                    <ChartDashboard />
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable
                        columns={columnasQuejas}
                        data={buzon}
                        placeholderFilter='Buscar folio...'
                        filter='folio'
                        encabezado={true}
                        titulo='Lista de quejas'
                        subtitle='Revisa las diferentes quejas que se han generado por medio del buzon.'
                    />
                </div>
            </div>
        </AppLayout>
    );
}
