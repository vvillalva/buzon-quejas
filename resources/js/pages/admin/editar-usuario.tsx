
//** Hooks  */
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//** Components  */
import Encabezados from '@/components/buzon/encabezados';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
import { LoaderCircle } from 'lucide-react';
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
interface Usuario {
    id:number;
    nombre:string;
    correo:string;
    rol: string;
    password: string;
}
interface RolProps{
    id: number;
    name: string;
}
//** Lib or Utils */
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
    {
        title: 'Editar Usuario',
        href: '/editar-usuario',
    },
];

export default function EditarUsuario({ user , roles }: { user : Usuario , roles: RolProps[] }) {
    const { data, setData, errors, put, processing } = useForm({
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
        password: ""
    })

    const editUsuario: FormEventHandler = (e) => {
        e.preventDefault();
        put(route(`usuarios.update`, user.id))
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Usuario" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezados title="Editar datos del usuario" subtitle="Modifica los datos del usuario en caso que se requiera cambiar algun dato especifico." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold text-[#333333]">Datos del usuario</h4>
                        <p className="text-[#787878]">Modifica los datos del usuario si se requiere realizar cambios en su información.</p>
                    </div>
                </div>
                <form onSubmit={editUsuario} className="flex flex-col gap-6">
                    <div className="nombre flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="nombre" className="font-medium">
                                Nombre
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    placeholder="Nombre de catalogo..."
                                />
                                {errors.nombre ? (
                                    <InputError message={errors.nombre} />
                                ) : (
                                    <Label className="text-sm font-normal text-muted-foreground">Ingresa un nombre claro y fácil de entender.</Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="correo flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="email" className="font-medium">
                                Correo
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
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
                    <div className="contraseña flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="password" className="font-medium">
                                Contraseña
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
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
                    <div className="rol flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="rol" className="font-medium">
                                Rol
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Select value={data.rol} onValueChange={(value) => setData('rol', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={data.rol} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((rol) => (
                                            <SelectItem key={rol.id} value={rol.name}>
                                                {rol.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.rol} />
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row justify-end">
                        <Button disabled={processing} type="submit" className="w-full md:w-[140px]">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
