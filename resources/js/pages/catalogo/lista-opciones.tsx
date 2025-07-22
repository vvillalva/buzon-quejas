import { ColumnaCatalogo, columnasCatalogo } from '@/components/buzon/columns';
import { DataTable }  from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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

    console.log(opciones)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${TITULOS[resourceName] ?? "Opción"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title={`${TITULOS[resourceName] ?? "Catalogo"}`} subtitle='Revisa las diferentes opciones que contiene tu catalogo dentro de todo el sistema.' />
                <Link href={route('tipo-de-violencia.create')} className="px-3 py-1 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded flex flex-row items-center gap-1"> <Plus size={16} /> Nueva opcion</Link>

                {/* <DataTable columns={columnasCatalogo} data={catalogos}/> */}
            </div>
        </AppLayout>
    )
}

//TODO: Generar la tabla para las opciones