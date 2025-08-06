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
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Editar Rol',
        href: '/editar-roles',
    },
];

export default function EditarRol() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Usuario" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Editar datos de la opción" subtitle="Modifica los datos de la opción en caso que haya cambiando su valor. " />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-[#333333] text-xl font-semibold">Datos del usuario</h4>
                        <p className="text-[#787878]">Modifica los datos del usuario si se requiere realizar cambios en su información.</p>
                    </div>
                </div>
                {/* <form onSubmit={editUsuario} className="flex flex-col gap-6">
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
                    <div className="correo w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                        <div className="w-full lg:w-[300px]">
                            <Label id='email' className="font-medium">Correo</Label>
                        </div>
                        <div className="flex flex-col gap-4 w-full lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    autoFocus
                                    autoComplete="email"
                                    value={data.correo}
                                    onChange={(e) => setData('correo', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.correo} />
                            </div>
                        </div>
                    </div>
                    <div className="contraseña w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                        <div className="w-full lg:w-[300px]">
                            <Label id='password' className="font-medium">Contraseña</Label>
                        </div>
                        <div className="flex flex-col gap-4 w-full lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                />
                                <InputError message={errors.password} />
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row justify-end">
                        <Button disabled={processing} type="submit" className="md:w-[140px] w-full">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Guardar</Button>
                    </div>
                </form> */}
            </div>
        </AppLayout>
    )
}
