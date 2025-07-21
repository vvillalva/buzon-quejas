import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

//TODO: HACER QUE EL USUARIO QUE TENGA ROL DE ADMINISTRADOR PUEDA VER ESTA VISTA
export default function ListaUsuarios() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                LISTA DE USUARIOS - ADMIN
            </div>
        </AppLayout>
    )
}
