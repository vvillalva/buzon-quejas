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
        $anioActual = now()->year;
        $porMesTipo = Queja::selectRaw("FORMAT(created_at, 'yyyy-MM-dd') as fecha, tipo_violencia, COUNT(*) as total")
            ->whereYear('created_at', $anioActual)
            ->groupBy(
                \DB::raw("FORMAT(created_at, 'yyyy-MM-dd')"),
                'tipo_violencia'
            )
            ->orderBy('fecha')
            ->get();
        // Primero, obten todos los tipos de violencia únicos
        $tipos = Queja::distinct()->pluck('tipo_violencia');
        // Estructura: ["fecha" => [tipo1 => total, tipo2 => total, ...], ...]
        $rows = [];
        foreach ($porMesTipo as $row) {
            $fecha = $row->fecha;
            if (!isset($rows[$fecha])) {
                $rows[$fecha] = ['date' => $fecha];
                foreach ($tipos as $tipo) {
                    $rows[$fecha][$tipo] = 0; // Inicializa en cero
                }
            }
            $rows[$fecha][$row->tipo_violencia] = (int) $row->total;
        }
        // Convierte a array plano (para el frontend)
        $totalQuejasTipo = array_values($rows);


        return Inertia::render("dashboard", [
            'buzon' => Queja::all(),
            'totalQuejasTipo' => $totalQuejasTipo
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
                "mensaje" => "required",
                "estatus" => "required"
            ],
            [
                "correo.required" => "El correo es obligatorio para generar tu queja.",
                "tel.required" => "El numero telefonico es obligatorio para generar tu queja.",
                "tipo_violencia" => "Selecciona una de la opciones del campo para realizar tu queja.",
                "mensaje" => "El mensaje es obligatorio para realizar la queja."
            ]
        );

        // Si el campo nombre viene vacío o nulo, ponle 'Anonimo'
        if (!$request->filled('nombre')) {
            $request->merge(['nombre' => 'Anonimo']);
        }

        // Normaliza el valor de tipo_violencia a minúsculas y sin acentos
        if ($request->filled('tipo_violencia')) {
            $tipo = $request->input('tipo_violencia');

            // Quitar acentos
            $tipoNormalizado = iconv('UTF-8', 'ASCII//TRANSLIT', $tipo);
            // Convertir a minúsculas
            $tipoNormalizado = mb_strtolower($tipoNormalizado);

            // Quitar cualquier caracter raro que deje iconv (opcional)
            $tipoNormalizado = preg_replace('/[^a-z0-9]/', '', $tipoNormalizado);

            $request->merge(['tipo_violencia' => $tipoNormalizado]);
        }

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
                    "mensaje",
                    "estatus"
                ]),
                ["folio" => $folio]
            )
        );

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
        $queja = Queja::find($id);
        return Inertia::render("queja/ver-queja", [
            "queja" => $queja
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $queja = Queja::find($id);
        return Inertia::render("queja/editar-queja", [
            "queja" => $queja
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                "estatus" => "required"
            ]
        );

        $queja = Queja::findOrFail($id); // Mejor usa findOrFail

        $queja->estatus = $request->input('estatus');

        $queja->save();

        return to_route("quejas");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
