import Encabezados from '@/components/buzon/encabezados';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catálogos',
        href: '/catalogos',
    },
    {
        title: 'Nuevo Catalogo',
        href: '/agregar-catalogo',
    },
];

export default function AgregarCatalogo() {
    const { data, setData, errors, post, processing} = useForm({
        nombre: "",
    })

    const createCatalogo: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('catalogos.store'))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Catalogo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Agrega nuevo catalogo" subtitle="Crea un nuevo catalogo para poder generar nuevas opciones dentro del sistema." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold">Datos del nuevo catalogo</h4>
                        <p className="text-muted-foreground">Ingresa los datos del nuevo catalogo para que pueda ser creado en el sistema.</p>
                    </div>
                    <form onSubmit={createCatalogo} className="flex flex-col gap-6">
                        <div className="nombre w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                            <div className="w-full lg:w-[300px]">
                                <Label id='nombre' className="font-medium">Nombre</Label>
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
                                        : <Label className="text-muted-foreground text-sm font-normal">Ingresa un nombre claro y fácil de entender.</Label>
                                    }
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex flex-row justify-end">
                            <Button disabled={processing} type="submit" className="md:w-[140px] w-full">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Guardar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}