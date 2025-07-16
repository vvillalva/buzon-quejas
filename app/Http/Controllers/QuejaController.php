<?php

namespace App\Http\Controllers;

use App\Models\Queja;
use Illuminate\Http\Request;

class QuejaController extends Controller
{
    public function createQueja(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'nullable|string|max:100',
            'correo' => 'nullable|email|max:100',
            'tel' => 'nullable|string|max:10',
            'tipoViolencia' => 'required|string',
            'mensaje' => 'required|string',
        ]);

        $queja = Queja::create([
            'nombre' => $data['nombre'],
            'correo' => $data['correo'],
            'tel' => $data['tel'],
            'tipo_violencia' => $data['tipoViolencia'],
            'mensaje' => $data['mensaje']
        ]);

        return response()->json(['message' => 'Queja enviada con éxito.'], 200);
    }
}