import Encabezados from '@/components/buzon/encabezados';
import { EstatusChart } from '@/components/charts/estatus-charts';
import PersonasChart from '@/components/charts/personas-chart';
import QuejasChart from '@/components/charts/quejas-chart';
import { TipoViolenciaChart } from '@/components/charts/tipo-violencia-chart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Estadisticas',
        href: '/estadisticas',
    },
];

export default function estadisticas({ porSemestreTipo = [], anonimas, conNombre, totalQuejasTipo, quejasPorMesEstatus }: { porSemestreTipo: [], anonimas: number, conNombre: number, totalQuejasTipo: [], quejasPorMesEstatus : [] }) {
    console.log('este es nuevo --- ',quejasPorMesEstatus)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estadisticas" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Estadisticas" subtitle="Consulta los diferentes datos estadisticos generado a lo largo de la historia." />
                <QuejasChart data={totalQuejasTipo} />
                <div className="flex flex-col lg:flex-row gap-6 overflow-auto">
                    <div className='min-w-[500px]'>
                        <TipoViolenciaChart tipo={porSemestreTipo} />
                    </div>
                    <div className='min-w-[500px]'>
                        <EstatusChart data={quejasPorMesEstatus} />
                    </div>
                    <PersonasChart dataAnonimas={anonimas} dataIdetificadas={conNombre} />
                </div>
            </div>
        </AppLayout>
    )
}
