<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bitacora;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/password');
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
    $validated = $request->validate(
        [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ],
        [
            // Mensajes personalizados
            'current_password.current_password' => 'La contraseña actual no es correcta.',
            'current_password.required' => 'Debes ingresar tu contraseña actual.',
            
            'password.required' => 'Debes ingresar una nueva contraseña.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
            'password.min' => 'La nueva contraseña debe tener al menos 8 caracteres.',
            // Si usas reglas extra de Password::defaults() (mayúsculas, números, símbolos, etc.)
            'password' => 'La nueva contraseña no cumple con los requisitos de seguridad.',
        ]
    );

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Editó su contraseña',
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        return back();
    }
}
