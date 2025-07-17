<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Mostrar todos los usuarios
    public function allUsers()
    {
        $users = User::all(); // Obtener todos los usuarios
        return response()->json($users);
    }

    // Mostrar un usuario específico
    public function showUser($id)
    {
        $user = User::find($id); // Buscar un usuario por ID
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($user);
    }

        // Crear un nuevo usuario
    public function createUser(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|unique:users,correo',
            'password' => 'required|string|min:6',
            'rol' => 'required|string|max:255',
        ]);

        $user = User::create([
            'nombre' => $validated['nombre'],
            'correo' => $validated['correo'],
            'password' => Hash::make($validated['password']),
            'rol' => $validated['rol'],
        ]);

        return response()->json($user, 201);
    }

    // Actualizar un usuario existente
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|unique:users,email,{$id}',
            'password' => 'nullable|string|min:6',
            'rol' => 'nullable|string|max:255',
        ]);

        $user->update([
            'nombre' => $validated['nombre'],
            'correo' => $validated['correo'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
            'rol' => $validated['rol'],
        ]);

        return response()->json(['message' => 'Usuario actualizado con exito', $user, 201]);
    }

    // Eliminar un usuario
    public function destroyUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }
}
