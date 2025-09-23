<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\Bitacora;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("admin/lista-usuarios", [
            'users' => User::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("admin/agregar-usuario", [
            "roles" => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "nombre" => 'required',
                'correo' => 'required',
                "password" => 'required',
                'rol' => 'required'
            ],
            [
                "nombre.required" => "El nombre es obligatorio para crear el usuario.",
                "correo" => 'El correo es obligatorio para crear el usuario.',
                "passoword" => 'La contraseña es obligatoria para crear el usuario.',
                "rol" => 'El rol es obligatorio para crear el usuario.'
            ]
        );

        $user = User::create(
            $request->only(["nombre", "correo", "rol"])
            +
            ["password" => Hash::make($request->password)]
        );

        $user->syncRoles([$request->rol]);

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Creó un nuevo usuario: '.$user->id,
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        return to_route('usuarios.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);
        return Inertia::render("admin/editar-usuario", [
            'user' => $user,
            "roles" => Role::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                "nombre",
                "correo",
                "rol"
            ]
        );

        $user = User::find($id);

        $user->nombre = $request->input('nombre');
        $user->correo = $request->input('correo');
        $user->rol = $request->input('rol');

        if($request->password){
            $user->password = Hash::make($request->password);
        }

        $user->save();

        $user->syncRoles([$request->rol]);

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Editó un usuario: '.$user->id,
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        return to_route("usuarios.index");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        
        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Eliminó un usuario: '.$user->id,
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        User::destroy($id);

        return to_route("usuarios.index");
    }
}
