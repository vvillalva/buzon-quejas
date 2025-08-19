import Logo from '@/assets/logo';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary-100 text-sidebar-primary-foreground">
                <Logo className="size-5 fill-current"/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Alerta de Genero</span>
            </div>
        </>
    );
}
