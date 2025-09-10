import { Link } from "@inertiajs/react"
import SGGYM from '@/assets/images/sggym-logo.png'
import IG from '@/assets/images/ig-logo.png'

const titles: Record<number, string> = {
  403: 'Acceso denegado',
  404: 'Página no encontrada',
  500: 'Error del servidor',
}

const descriptions: Record<number, string> = {
  403: 'No tienes permisos para ver este contenido.',
  404: 'La página que buscas no existe o fue movida.',
  500: 'Ocurrió un problema inesperado.',
}

interface ErrorProps {
    status: number
}
export default function Error({ status }: ErrorProps) {
    const title = titles[status] ?? 'Error';
    const description = descriptions[status] ?? 'Ocurrió un error.';

    return (

        <main className="h-dvh flex flex-col justify-center bg-white px-6 py-24 sm:py-24 lg:px-8">
            <div className="flex flex-col items-center text-center ">
                <p className="text-base font-semibold text-primary-900">{status}</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tighter text-balance text-primary sm:text-7xl">{title}</h1>
                <p className="mt-2 text-lg text-pretty text-gray-400 sm:text-xl/8">{description}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/"
                        className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                        Regresar al inicio
                    </Link>
                </div>
            </div>
            <footer className="pt-20">
                <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
                    <div><p className="font-extrabold text-primary-700 text-2xl tracking-tighter">Unidad de Informatica</p></div>
                    <div>
                        <img src={SGGYM} alt="No Permissions" className="w-[300px]" />
                    </div>
                    <div>
                        <img src={IG} alt="No Permissions" className="w-[200px]" />
                    </div>
                </div>
            </footer>
        </main>
    );
}
