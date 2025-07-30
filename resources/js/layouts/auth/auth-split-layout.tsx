import Logo from '@/assets/logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    //TODO: AGREGAR LOS LOGOS A LOS RESPECTIVOS ESPACIOS
    //

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 dark:bg-neutral-900">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-[#96559B]" />
                <Link href={route('buzon')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {name}
                </Link>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Link href={route('buzon')} className="relative z-20 flex items-center justify-center">
                        <Logo className="h-10 fill-current sm:h-12" />
                    </Link>
                    <div className="flex flex-col gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-3xl text-center font-semibold ">{title}</h1>
                        <p className="text-sm text-balance text-center text-muted-foreground w-fit">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
