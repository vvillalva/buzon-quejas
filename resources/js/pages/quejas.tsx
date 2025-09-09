//** Hooks  */
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
//** Components  */
import { columnasQuejas } from '@/components/buzon/columns';
import { DataTable } from '@/components/buzon/data-table';
import Encabezados from '@/components/buzon/encabezados';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
import { CircleCheck } from 'lucide-react';
//** Interface or Types  */
import { type BreadcrumbItem } from '@/types';
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quejas',
        href: '/quejas',
    },
];

export default function Quejas({ buzon = [] }) {
    const [open, setOpen] = useState(false);
    const { props } = usePage<{ success?: string; folio?: string }>();
    const success = props.success;
    const folio = props.folio;

    // Cuando success y folio existan, abre el dialog automáticamente
    useEffect(() => {
        if (success && folio) setOpen(true);
    }, [success, folio]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quejas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezados title="Quejas" subtitle="Revisa las quejas que se han generado y los datos historicos que se tienen registrados." />
                <DataTable
                    columns={columnasQuejas}
                    data={buzon}
                    resourceName="queja"
                    labelButton="Agregar queja"
                    placeholderFilter="Buscar folio..."
                    filter="folio"
                />
            </div>
            {success && folio && (
                <AlertDialog open={open} onOpenChange={setOpen}>
                    {/* No necesitas AlertDialogTrigger */}
                    <AlertDialogContent>
                        <AlertDialogHeader className="flex flex-col items-center justify-center">
                            <div className="w-fit rounded-full bg-primary-300 p-3 text-primary-600">
                                <CircleCheck />
                            </div>
                            <AlertDialogTitle className="flex flex-row items-center justify-center gap-2 text-2xl lg:justify-start">
                                {' '}
                                ¡Queja Generada!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-center font-semibold">
                                {success} A continuación se te generara el folio para darle seguimiento a la queja.
                                <br />
                                <br />
                                <span>
                                    Num. de folio: <br /> <span className="text-xl font-bold">{folio}</span>
                                </span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Separator />
                        <AlertDialogFooter>
                            <div className="flex w-full flex-row items-center justify-center">
                                <AlertDialogAction className="min-w-[260px]" onClick={() => setOpen(false)}>
                                    Confirmar
                                </AlertDialogAction>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AppLayout>
    );
}
