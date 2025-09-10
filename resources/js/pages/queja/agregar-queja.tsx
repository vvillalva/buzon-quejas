//** Hooks  */
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//** Components  */
import Encabezados from '@/components/buzon/encabezados';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { BreadcrumbItem } from '@/types';
import { LoaderCircle } from 'lucide-react';

interface TipoViolencia {
    id: number;
    nombre: string;
}
interface FormularioProps {
    tipoViolencia: TipoViolencia[];
}

//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quejas',
        href: '/quejas',
    },
    {
        title: 'Agregar Queja',
        href: '/',
    },
];

export default function AgregarQueja({ tipoViolencia = [] }: FormularioProps) {
    const { data, setData, errors, post, processing, reset } = useForm({
        nombre: '',
        correo: '',
        tel: '',
        tipo_violencia: '',
        mensaje: '',
        estatus: 'pendiente',
    });
    const createQueja: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('queja.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Queja" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezados title="Agregar Queja" subtitle="Agrega la queja fisica de manera manual para generar un folio de seguimiento." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold">Datos de la queja fisica</h4>
                        <p className="text-muted-foreground">
                            Ingresa los datos de la queja para que se genere su folio y se pueda dar seguiemiento a su queja.
                        </p>
                    </div>
                    <form onSubmit={createQueja} className="flex flex-col gap-6">
                        <div className="nombre flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                            <div className="w-full lg:w-[300px]">
                                <Label id="nombre" className="font-medium">
                                    Nombre o seudónimo (Opcional)
                                </Label>
                            </div>
                            <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Input
                                        id="nombre"
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        placeholder="Nombre"
                                    />
                                    {errors.nombre ? (
                                        <InputError message={errors.nombre} />
                                    ) : (
                                        <Label className="text-sm font-normal text-muted-foreground">
                                            Si la queja es anonima, por favor deja el espacio en blanco.
                                        </Label>
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
                        <div className="tel flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                            <div className="w-full lg:w-[300px]">
                                <Label id="tel" className="font-medium">
                                    Número telefónico
                                </Label>
                            </div>
                            <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Input
                                        id="tel"
                                        name="tel"
                                        type="tel"
                                        maxLength={10}
                                        required
                                        inputMode="numeric"
                                        autoComplete="tel"
                                        placeholder="Ej. 5512345678"
                                        value={data.tel}
                                        onChange={(e) => setData('tel', e.target.value.replace(/[^0-9]/g, ''))}
                                    />
                                    <InputError message={errors.tel} />
                                </div>
                            </div>
                        </div>
                        <div className="tipo-violencia flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                            <div className="w-full lg:w-[300px]">
                                <Label id="tipoViolencia" className="font-medium">
                                    Tipo de Violencia
                                </Label>
                            </div>
                            <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Select
                                        value={data.tipo_violencia}
                                        onValueChange={(value) => setData('tipo_violencia', value)}
                                        required
                                        name="tipoViolencia"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona una opción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {tipoViolencia.map((opcion) => (
                                                    <SelectItem key={opcion.id} value={opcion.nombre}>
                                                        {opcion.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.tipo_violencia} />
                                </div>
                            </div>
                        </div>
                        <div className="mensaje flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                            <div className="w-full lg:w-[300px]">
                                <Label id="tel" className="font-medium">
                                    Descripción detallada
                                </Label>
                            </div>
                            <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Textarea
                                        id="mensaje"
                                        name="mensaje"
                                        placeholder="Relata el caso detalladamente."
                                        className="min-h-48"
                                        value={data.mensaje}
                                        onChange={(e) => setData('mensaje', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.mensaje} />
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
            </div>
        </AppLayout>
    );
}
