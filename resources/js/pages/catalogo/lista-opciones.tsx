import { ColumnaCatalogo, columnasCatalogo } from '@/components/buzon/columns';
import { DataTable }  from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catalogo',
        href: '/catalogos', //Asi como esta en routes 'catalogos'
    },
];

const data: ColumnaCatalogo[] = [
  {
    id: 1,
    nombre: "zsto es un catalogo"
  },
  {
    id: 2,
    nombre: "Esto es un catalogo"
  },
  {
    id: 3,
    nombre: "asto es un catalogo"
  },
]

export default function ListaOpciones({catalogos=[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catalogo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title='Catalogos' subtitle='Revisa los diferentes catalogos que tienes disponibles dentro del sistema.'/>
                <DataTable columns={columnasCatalogo} data={catalogos}/>
            </div>
        </AppLayout>
    )
}
   