//** Hooks  */
import { Head, usePage } from '@inertiajs/react';
//** Components  */
import { columnasOpciones } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import { ConfirmProvider } from '@/Providers/ConfirmProvider';
import type { BreadcrumbItem } from '@/types';
//** Consts or Fuctions*/

export default function ListaOpciones({ opciones = [], resourceName = '' }) {
    const TITULOS: Record<string, string> = {
        'tipo-de-violencia': 'Tipo de Violencia',
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Catalogo',
            href: '/dashboard', //Asi como esta en routes
        },
        {
            title: `${TITULOS[resourceName] ?? 'Catalogo'}`,
            href: `/${resourceName}`, //Asi como esta en routes 'catalogos'
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${TITULOS[resourceName] ?? 'Opción'}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezados
                    title={`${TITULOS[resourceName] ?? 'Catalogo'}`}
                    subtitle="Revisa las diferentes opciones que contiene tu catalogo dentro de todo el sistema."
                />
                <ConfirmProvider>
                    <DataTable
                        columns={columnasOpciones}
                        data={opciones}
                        resourceName={resourceName}
                        placeholderFilter="Buscar por nombre..."
                        filter="nombre"
                    />
                </ConfirmProvider>
            </div>
        </AppLayout>
    );
}
