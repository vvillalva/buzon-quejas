//** Hooks  */
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//** Components  */
import Encabezados from '@/components/buzon/encabezados';
import AppLayout from '@/layouts/app-layout';
import DatosQueja from '@/components/buzon/datos-queja';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
interface Queja {
    id: number;
    nombre: string;
    estatus: string;
    folio: string;
    correo: string;
    tel: string;
    tipo_violencia: string;
    created_at: string;
    mensaje:string;
}
interface EditarQuejaProps {
    queja: Queja
}
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quejas',
        href: '/quejas',
    },
    {
        title: 'Editar Queja',
        href: '/'
    }
];

export default function EditarQueja({ queja }: EditarQuejaProps) {
    const { data, setData, put } = useForm({
        estatus: queja.estatus || "Sin estatus"
    })
    const editaQueja: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('update-queja', queja.id))
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Queja" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Editar queja" subtitle="Cambia el estatus de la queja que estas visualizando." />
                <form onSubmit={editaQueja}>
                    <div className='flex flex-col border border-neutral-100 gap-2 p-4 rounded'>
                        <div className='encabezado flex flex-col lg:flex-row justify-between gap-4'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-3xl font-semibold'>Queja #{queja.folio}</p>
                                <small>Esta es la información completa de la queja generada por medio del buzon.</small>
                            </div>
                            <Select
                                value={data.estatus}
                                onValueChange={(value) => setData('estatus', value)}
                            >
                                <SelectTrigger className="lg:w-[180px] w-full">
                                    <SelectValue placeholder={data.estatus.charAt(0).toUpperCase() + queja.estatus.slice(1)} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="en-curso">En Curso</SelectItem>
                                    <SelectItem value="atendido">Atendido</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="flex flex-col gap-4 pt-4">
                            <div className='flex flex-wrap gap-2'>
                                <DatosQueja title={"Nombre"} data={queja.nombre} />
                                <DatosQueja title={"Correo Electronico"} data={queja.correo} />
                                <DatosQueja title={"No. Telefonico"} data={queja.tel} />
                                <DatosQueja title={"Tipo de Violencia"} data={queja.tipo_violencia} />
                                <DatosQueja title={"Fecha de Creación"} data={queja.created_at.slice(0, 10)} />
                            </div>
                            <div className="flex w-full">
                                <DatosQueja title={"Mensaje"} data={queja.mensaje} className='w-full'/>
                            </div>
                        </div>
                        <div className='flex flex-row justify-end pt-2'>
                            <Button type='submit' className='px-10 lg:w-fit w-full'>Guardar</Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}