<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bitacora;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // temporalmente en el controller
        //dd($request->validated(), $request->all());
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('correo')) {
            $request->user()->updated_at = null;
        }

        $request->user()->save();

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Editó su perfil',
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Elimino su cuenta',
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);
        
        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
