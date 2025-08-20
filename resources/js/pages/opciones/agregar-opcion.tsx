//** Hooks  */
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
//** Components  */
import Encabezados from '@/components/buzon/encabezados';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
interface Catalogo {
  id: number
  nombre: string
  created_at?: string
  updated_at?: string
}
//** Consts or Fuctions*/

export default function AgregarOpcion({ catalogos = [], resourceName = "" }: { catalogos: Catalogo[], resourceName: string }) {
    const TITULOS: Record<string, string> = {
        "tipo-de-violencia": "Tipo de Violencia",
        //Si hay mas catalogos agregarlos
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Catalogo',
            href: '/dashboard',
        },
        {
            title: `${TITULOS[resourceName] ?? "Catalogo"}`,
            href: `/${resourceName}`, //Asi como esta en routes 'catalogos'
        },
        {
            title: 'Nueva Opción',
            href: '/',
        },
    ];
    //Obtener el ID del Catalogo para crear la opción
    const nombreCatalogo = TITULOS[resourceName];
    const catalogoActual = catalogos.find((cat: Catalogo) => cat.nombre === nombreCatalogo);
    const catalogoId = catalogoActual ? catalogoActual.id : "";
    const { data, setData, errors, post } = useForm({
        nombre: "",
        estatus: true,
        catalogo_id: catalogoId
    })
    useEffect(() => {
        setData("catalogo_id", catalogoId);
    }, [catalogoId, setData]);
    const createCatalogo: FormEventHandler = (e) => {
        e.preventDefault();
        post(route(`${resourceName}.store`))
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar Opcion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <Encabezados title="Agrega nueva opción" subtitle="Implementa nuevas opciones para tus catalogos de opciones." />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold">Datos de la nueva opción</h4>
                        <p className="text-muted-foreground">Ingresa los datos de la nueva opción para el catalogo.</p>
                    </div>
                    <form onSubmit={createCatalogo} className="flex flex-col gap-6">
                        <div className="w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
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
                        {/* <div className="w-full flex flex-col gap-4 lg:flex-row lg:gap-[180px] ">
                            <div className="w-full lg:w-[300px]">
                                <Label id='nombre' className="font-medium">Estatus</Label>
                            </div>
                            <div className="flex flex-col gap-4 w-full lg:w-[405px]">
                            </div>
                        </div> */}
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
