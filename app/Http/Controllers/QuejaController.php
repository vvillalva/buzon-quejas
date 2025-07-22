<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Queja;

class QuejaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("dashboard", [
            'buzon' => Queja::all()
        ]);
    }
    public function quejasIndex()
    {
        return Inertia::render("quejas", [
            'buzon' => Queja::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "nombre",
                "correo" => "required",
                "tel" => "required",
                "tipo_violencia" => "required",
                "mensaje" => "required"
            ],
            [
                "correo.required" => "El correo es obligatorio para generar tu queja.",
                "tel.required" => "El numero telefonico es obligatorio para generar tu queja.",
                "tipo_violencia" => "Selecciona una de la opciones del campo para realizar tu queja.",
                "mensaje" => "El mensaje es obligatorio para realizar la queja."
            ]
        );

        // Generar folio automáticamente
        $folio = $this->generarFolio();

        // Guardar la queja incluyendo el folio
        Queja::create(
            array_merge(
                $request->only([
                    "nombre",
                    "correo",
                    "tel",
                    "tipo_violencia",
                    "mensaje"
                ]),
                ["folio" => $folio]
            )
        );

        \Log::info('Redirigiendo con', ['folio' => $folio]);

        return redirect()->route('buzon')->with([
            'success' => 'Haz realizado tu queja con éxito.',
            'folio' => $folio
        ]);
    }

    // Función protegida para generar el folio (puedes ajustar el formato)
    protected function generarFolio()
    {
        // QJ-20250722-0001 (QJ-fecha-numSecuencial)
        $fecha = date('Ymd');
        $hoy = now()->toDateString();
        $ultimo = Queja::whereDate('created_at', $hoy)->count() + 1;
        return 'QJ-' . $fecha . '-' . str_pad($ultimo, 4, '0', STR_PAD_LEFT);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
