import Encabezados from '@/components/buzon/encabezados';
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

export default function estadisticas({ porSemestreTipo = [], anonimas, conNombre, totalQuejasTipo } : { porSemestreTipo : [], anonimas: number, conNombre: number, totalQuejasTipo: []}) {
    //TODO: AGREGAR UNA GRAFICA DE ESTATUS, pero para eso debo cambiar logica y agregar un campo en la BD que diga, estatus_queja o estatus - NECESITO MODIFICAR LA BD PARA SEGUIR CON ESTE PASO
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
                        <TipoViolenciaChart tipo={porSemestreTipo} />
                    </div>
                    <PersonasChart dataAnonimas={anonimas} dataIdetificadas={conNombre} />
                </div>
            </div>
        </AppLayout>
    )
}
