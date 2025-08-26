//** Hooks  */
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
//** Components  */
import FormularioBuzon from '@/components/buzon/formulario-buzon';
import Header from '@/components/header';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
//** Assets  */
//** Interface or Types  */
//** Consts or Fuctions*/

export default function BuzonQuejas({ tipoViolenciaOptions = [] }) {
    const [open, setOpen] = useState(false);
    const { props } = usePage<{ success?: string; folio?: string }>();
    const success = props.success;
    const folio = props.folio;

    // Cuando success y folio existan, abre el dialog automáticamente
    useEffect(() => {
        if (success && folio) setOpen(true);
    }, [success, folio]);

    return (
        <main className="h-screen">
            <Header />
            <section className="formulario-buzon my-10 flex flex-col gap-8 px-4 pb-12 lg:px-[132px] dark:text-white">
                <div className="encabezados flex flex-col gap-4">
                    <div className="titulo flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0">
                        <div className="flex flex-row">
                            {/* Por si se agrega icono aun lado */}
                            <h1 className="text-4xl font-semibold text-[#96559B] dark:text-white">Buzón de quejas</h1>
                        </div>
                        <hr className="mx-6 hidden h-12 w-px border-0 bg-[#BEB9B9] lg:flex dark:text-white" />
                        <p className="text-base font-light text-[#434343] dark:text-white">Unidad de Igualdad de Genero</p>
                    </div>
                    <hr className="bg-[#F2EDED]" />
                    <p className="text-sm text-[#4E4E4E] dark:text-white">
                        Este buzón es un espacio seguro donde puedes reportar cualquier situación de violencia de género que hayas sufrido o
                        presenciado. Toda la información se manejará con estricta confidencialidad y se dará seguimiento conforme a la normativa
                        vigente.
                    </p>
                    <p className="text-sm font-semibold text-[#96559B] italic dark:text-primary-400">
                        *Tus datos personales son opcionales. Si prefieres mantener el anonimato, puedes omitir los campos de identificación. Tu
                        seguridad y privacidad son nuestra prioridad.
                    </p>
                </div>
                <div className="formulario">
                    <FormularioBuzon tipoViolencia={tipoViolenciaOptions} />
                </div>
                {success && folio && (
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        {/* No necesitas AlertDialogTrigger */}
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex flex-row items-center justify-center gap-2 text-2xl lg:justify-start">
                                    {' '}
                                    ¡Queja enviada!
                                </AlertDialogTitle>
                                <AlertDialogDescription className="font-semibold">
                                    {success} A continuación se te dara tu folio de seguimiento para tu casa, recuerda guardar bien los siguientes
                                    datos.
                                    <br />
                                    <br />
                                    <span>
                                        Num. de folio: <br /> <span className="text-xl font-bold">{folio}</span>
                                    </span>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={() => setOpen(false)}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </section>
        </main>
    );
}
