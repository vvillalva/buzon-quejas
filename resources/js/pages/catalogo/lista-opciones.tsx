import { columnasOpciones } from '@/components/buzon/columns';
import { DataTable }  from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function ListaOpciones({ opciones = [], resourceName = "" }) {
    const TITULOS: Record<string, string> = {
        "tipo-de-violencia": "Tipo de Violencia",
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Catalogo',
            href: '/dashboard', //Asi como esta en routes
        },
        {
            title: `${TITULOS[resourceName] ?? "Catalogo"}`,
            href: `/${resourceName}`, //Asi como esta en routes 'catalogos'
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${TITULOS[resourceName] ?? "Opción"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title={`${TITULOS[resourceName] ?? "Catalogo"}`} subtitle='Revisa las diferentes opciones que contiene tu catalogo dentro de todo el sistema.' />
                <DataTable 
                    columns={columnasOpciones} 
                    data={opciones}
                    resourceName={resourceName}
                    placeholderFilter='Buscar por nombre...'
                    filter='nombre'
                />
            </div>
        </AppLayout>
    )
}