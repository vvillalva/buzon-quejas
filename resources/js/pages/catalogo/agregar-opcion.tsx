import Encabezados from '@/components/buzon/encabezados';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catalogo',
        href: '/catalogos',
    },
    {
        title: 'Nueva Opción',
        href: '/',
    },
];
export default function AgregarOpcion() {
    const {data, setData, errors, post} = useForm({
        nombre: ""
    })

    const createCatalogo: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('catalogos.store'))
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar Opcion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Agrega nueva opción" subtitle="Implementa nuevas opciones para tu catalogo de opciones." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-[#333333] text-xl font-semibold">Datos de la nueva opción</h4>
                        <p className="text-[#787878]">Ingresa los datos de la nueva opción para el catalogo.</p>
                    </div>
                    <form onSubmit={createCatalogo} className="flex flex-col gap-6">
                        <div className="w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                            <div className="w-full lg:w-[300px]">
                                <Label id='nombre' className="font-medium text-[#1E1E1E]">Nombre</Label>
                            </div>
                            <div className="flex flex-col gap-4 w-full lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Input
                                        id='nombre'
                                        type="text"
                                        value={data.nombre}
                                        required
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        placeholder='Nombre de catalogo...'
                                    />
                                    {errors.nombre
                                        ? <InputError message={errors.nombre} />
                                        : <Label className="text-[#64748B] text-sm font-normal">Ingresa un nombre claro y fácil de entender.</Label>
                                    }
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex flex-row justify-end">
                            <Button type="submit" className="md:w-[140px] w-full">Guardar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
