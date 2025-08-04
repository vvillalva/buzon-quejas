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
        title: 'Usuarios',
        href: '/usuarios',
    },
    {
        title: 'Nuevo Usuario',
        href: '/agregar-usuario',
    },
];

export default function AgregarUsuario() {
    const { data, setData, errors, post, processing} = useForm({
        nombre: "",
        correo: "",
        password: "",
        rol: "admin"
    })

    const createUsuario: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('usuarios.store'))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Usuario" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Agrega nuevo usuario" subtitle="Crea un nuevo usuario para que pueda acceder al sistema." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold">Datos del nuevo usuario</h4>
                        <p className="text-muted-foreground">Ingresa los datos del nuevo usuario para que pueda tener acceso al sistema.</p>
                    </div>
                    <form onSubmit={createUsuario} className="flex flex-col gap-6">
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
                        <div className="correo w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                            <div className="w-full lg:w-[300px]">
                                <Label id='email' className="font-medium">Correo</Label>
                            </div>
                            <div className="flex flex-col gap-4 w-full lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
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
                                        required
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
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
