import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ListaOpciones() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catalogo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                Lista de opciones dentro de un catalogo
            </div>
        </AppLayout>
    )
}
