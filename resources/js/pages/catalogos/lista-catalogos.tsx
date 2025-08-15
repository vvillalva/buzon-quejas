import { columnasCatalogo } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catálogos',
        href: '/catalogos',
    },
];

export default function ListaCatalogos({ catalogos=[]}:{ catalogos : []}) {
    console.log(catalogos)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Catalogos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto ">
                <Encabezados title="Lista de Catálogos" subtitle='Revisa los diferentes catalogos disponibles dentro del sistema.' />
                <DataTable
                    columns={columnasCatalogo}
                    data={catalogos}
                    resourceName="catalogos"
                    labelButton='Agregar catalogo'
                    placeholderFilter='Buscar por nombre...'
                    filter='nombre'
                />
            </div>
        </AppLayout>
    )
}