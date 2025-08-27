//** Hooks  */
import { Head } from '@inertiajs/react';
//** Components  */
import DatosQueja from '@/components/buzon/datos-queja';
import Encabezados from '@/components/buzon/encabezados';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
import { CircleCheck, Loader, LoaderCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface Queja {
    id: number;
    nombre: string;
    estatus: string;
    folio: string;
    correo: string;
    tel: string;
    tipo_violencia: string;
    created_at: string;
    mensaje: string;
}
interface EditarQuejaProps {
    queja: Queja;
}
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quejas',
        href: '/quejas',
    },
    {
        title: 'Ver Queja',
        href: '/',
    },
];

export default function VerQueja({ queja }: EditarQuejaProps) {
    const estatus = queja.estatus;
    // Puedes usar colores diferentes para cada estatus si quieres
    let icon = null;
    let text = null;
    let badgeClass = 'text-muted-foreground px-1.5';
    
    if (estatus === 'atendido') {
        icon = <CircleCheck className="fill-green-600 text-green-300 dark:fill-green-700" />;
        text = <p className="text-green-700 dark:text-green-500">Atendido</p>;
        badgeClass += ' border-green-600 bg-status-card'; // Puedes agregar más clases
    } else if (estatus === 'en-curso') {
        icon = <LoaderCircle className="animate-spin text-yellow-500" />;
        text = <p className="text-yellow-500">En Curso</p>;
        badgeClass += ' border-yellow-500 text-yellow-600 bg-status-card';
    } else {
        icon = <Loader />;
        text = <p>Pendiente</p>;
        badgeClass += ' border-neutral-500 bg-status-card';
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalles de Queja" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto rounded-xl p-8">
                <Encabezados title="Detalles de Queja" subtitle="Revisa los datos detallados de la queja que seleccionaste." />
                <div className="flex flex-col gap-2 rounded border border-neutral-100 p-4">
                    <div className="encabezado flex flex-col justify-between gap-4 lg:flex-row">
                        <div className="flex flex-col gap-1">
                            <p className="text-3xl font-semibold">Queja #{queja.folio}</p>
                            <small>Esta es la información completa de la queja generada por medio del buzon.</small>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <Badge variant="outline" className={badgeClass}>
                                {icon} {text}
                            </Badge>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-4 pt-4">
                        <div className="flex flex-wrap gap-2">
                            <DatosQueja title={'Nombre'} data={queja.nombre} />
                            <DatosQueja title={'Correo Electronico'} data={queja.correo} />
                            <DatosQueja title={'No. Telefonico'} data={queja.tel} />
                            <DatosQueja title={'Tipo de Violencia'} data={queja.tipo_violencia} />
                            <DatosQueja title={'Fecha de Creación'} data={queja.created_at.slice(0, 10)} />
                        </div>
                        <div className="flex w-full">
                            <DatosQueja title={'Mensaje'} data={queja.mensaje} className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
