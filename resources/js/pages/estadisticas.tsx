import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Estadisticas',
        href: '/estadisticas',
    },
];

export default function estadisticas() {
  return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estadisticas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='w-full bg-amber-400'>dentro</div>
                Estas son estadisticas
            </div>
        </AppLayout>
  )
}
