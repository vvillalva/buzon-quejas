//** Hooks  */
import { Head } from '@inertiajs/react';
import { useCan } from '@/hooks/useCan';
//** Components  */
import { columnasQuejas } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import QuejasChart from '@/components/charts/quejas-chart';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
import SGGYM from '@/assets/images/sggym-logo.png'
import IG from '@/assets/images/ig-logo.png'
//** Interface or Types  */
import { type BreadcrumbItem } from '@/types';
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ buzon = [], totalQuejasTipo }: { buzon: []; totalQuejasTipo: [] }) {
    const { has, hasAny  } = useCan();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                {hasAny(['ver.quejas', 'ver.estadisticas']) ? (
                    <>
                        <Encabezados title="Dashboard" subtitle="Revisa las quejas que se han genero y los datos estadisticos historicos." />

                        {has('ver.estadisticas') && (
                            <div className="@container/main flex flex-1 flex-col gap-4">
                                <QuejasChart data={totalQuejasTipo} />
                            </div>
                        )}
                        {has('ver.quejas') && (
                            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                                <DataTable
                                    columns={columnasQuejas}
                                    pagination={false}
                                    data={buzon}
                                    placeholderFilter="Buscar folio..."
                                    filter="folio"
                                    encabezado={true}
                                    titulo="Lista de quejas"
                                    subtitle="Revisa las diferentes quejas que se han generado por medio del buzon."
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex h-full flex-1 flex-col items-center justify-center">
                        <div className="mb-4 flex flex-col items-center justify-center gap-4 lg:flex-row">
                            <div>
                                <img src={SGGYM} alt="No Permissions" className="w-[300px]" />
                            </div>
                            <div>
                                <img src={IG} alt="No Permissions" className="w-[200px]" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter">
                            Al parecer no tienes los permisos necesarios para interactuar en este sección
                        </h1>
                        <small className="text-neutral-400">
                            Por favor ponte en contacto con tu supervisor o con el area de sistemas para obtener más información.
                        </small>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
