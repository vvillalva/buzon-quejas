//** Hooks  */
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
//** Components  */
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
//** Assets  */
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
//** Interface or Types  */
type LoginForm = {
    correo: string;
    password: string;
};
interface LoginProps {
    status?: string;
}
//** Consts or Fuctions*/

export default function Login({ status }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        correo: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Buzon de Quejas" description="Ingresa tus credenciales para ingresar al adminstrador.">
            <Head title="Inicio de Sesión" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.correo}
                            onChange={(e) => setData('correo', e.target.value)}
                            placeholder="correo@ejemplo.com"
                        />
                        <InputError message={errors.correo} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="********"
                            />
                            {/* Botón mostrar/ocultar */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 my-[2px] mr-[2px] h-[calc(100%-4px)] px-2 hover:bg-transparent"
                                onClick={() => setShowPassword((s) => !s)}
                                onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4 text-neutral-500" aria-hidden="true" />
                                ) : (
                                    <Eye className="size-4 text-neutral-500" aria-hidden="true" />
                                )}
                            </Button>
                        </div>
                        <InputError message={errors.password} />
                    </div>
                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>
                </div>
            </form>
            <div className="flex flex-col justify-center pt-5">
                <small className='text-center text-neutral-400'>Powered by Unidad de Informatica de <b>SSGGyM</b></small>
                <small className="text-center text-neutral-400">
                    Todos los derechos reservados © 2025 Secretaria General de Gobierno y Mediación.
                </small>
            </div>
            {status && <div className="mb-4 text-center text-sm font-medium text-primary">{status}</div>}
        </AuthLayout>
    );
}
