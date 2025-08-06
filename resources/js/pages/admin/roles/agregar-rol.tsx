import { ColumnaPermisos, ColumnaUsuarios } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
        title: 'Nuevo Rol',
        href: '/agregar-rol',
    },
];

export default function AgregarRol({ permissions }) {
    console.log(permissions)


    const { data, setData, errors, post, processing} = useForm({
        name: "",
        permissions: []
    })

    function handleCheckboxChange (permissionName, checked) {
        if(checked){
            setData("permissions", [...data.permissions, permissionName]);
        } else {
            setData("permissions", data.permissions.filter(name => name !== permissionName));
        }
    }

    const createRol: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Rol" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Agrega nuevo rol" subtitle="Crea un nuevo rol con privilegios para poder acceder a las funcionalidades del sistema." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold">Datos del nuevo rol</h4>
                        <p className="text-muted-foreground">Selecciona los privilegios que el rol va tener para poder acceder a las funcionalidades del sistema.</p>
                    </div>
                    <form onSubmit={createRol} className="flex flex-col gap-6">
                        <div className="nombre w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                            <div className="w-full lg:w-[300px]">
                                <Label id='name' className="font-medium">Nombre</Label>
                            </div>
                            <div className="flex flex-col gap-4 w-full lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Input
                                        id='name'
                                        type="text"
                                        value={data.name}
                                        required
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder='Nombre del rol...'
                                    />
                                    {errors.name
                                        ? <InputError message={errors.name} />
                                        : <Label className="text-muted-foreground text-sm font-normal">Ingresa un nombre claro y fácil de entender.</Label>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="permisos w-full flex flex-col gap-4">
                            <div className="w-full lg:w-[300px]">
                                <Label id='permissions' className="font-medium">Permisos</Label>
                            </div>
                            {/* {permissions.map((item) =>
                                <label key={item} className='flex gap-2 items-center'>
                                    <input
                                        type='checkbox'
                                        value={item}
                                        id={item}
                                        onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                    />
                                    <span>{item}</span>
                                </label>
                            )} */}
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
