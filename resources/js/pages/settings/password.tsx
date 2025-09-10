//** Hooks  */
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
//** Components  */
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de Contraseña',
        href: '/settings/password',
    },
];

export default function Password() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de Contraseña" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Actualizar contraseña"
                        description="Asegúrese de que su cuenta utilice una contraseña larga y aleatoria para mantenerse segura."
                    />
                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Contraseña actual</Label>
                            <div className="relative">
                                <Input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    placeholder="Contraseña actual"
                                />
                                {/* Botón mostrar/ocultar */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 my-[2px] mr-[2px] h-[calc(100%-4px)] px-2 hover:bg-transparent"
                                    onClick={() => setShowCurrentPassword((s) => !s)}
                                    onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
                                    aria-label={showCurrentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="size-4 text-neutral-500" aria-hidden="true" />
                                    ) : (
                                        <Eye className="size-4 text-neutral-500" aria-hidden="true" />
                                    )}
                                </Button>
                            </div>

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    type={showNewPassword ? 'text' : 'password'}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Nueva contraseña"
                                />
                                {/* Botón mostrar/ocultar */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 my-[2px] mr-[2px] h-[calc(100%-4px)] px-2 hover:bg-transparent"
                                    onClick={() => setShowNewPassword((s) => !s)}
                                    onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
                                    aria-label={showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="size-4 text-neutral-500" aria-hidden="true" />
                                    ) : (
                                        <Eye className="size-4 text-neutral-500" aria-hidden="true" />
                                    )}
                                </Button>
                            </div>

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirmar contraseña"
                                />
                                {/* Botón mostrar/ocultar */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 my-[2px] mr-[2px] h-[calc(100%-4px)] px-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword((s) => !s)}
                                    onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
                                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="size-4 text-neutral-500" aria-hidden="true" />
                                    ) : (
                                        <Eye className="size-4 text-neutral-500" aria-hidden="true" />
                                    )}
                                </Button>
                            </div>

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar contraseña</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Cambio realizado</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
