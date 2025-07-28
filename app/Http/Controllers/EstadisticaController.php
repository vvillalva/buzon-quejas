<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Queja;

class EstadisticaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalQuejas = Queja::count();

        $porSemestreTipo = Queja::selectRaw("tipo_violencia,YEAR(created_at) as anio, CASE WHEN MONTH(created_at) BETWEEN 1 AND 6 THEN 1 ELSE 2 END as semestre, COUNT(*) as total")
            ->groupBy(
                'tipo_violencia',
                \DB::raw('YEAR(created_at)'),
                \DB::raw('CASE WHEN MONTH(created_at) BETWEEN 1 AND 6 THEN 1 ELSE 2 END')
            )
            ->orderBy('anio')
            ->orderBy('semestre')
            ->get();

        $anonimas = Queja::whereNull('nombre')->orWhere('nombre', '')->count();
        $conNombre = $totalQuejas - $anonimas;



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
            $rows[$fecha][$row->tipo_violencia] =(int)$row->total;
        }
        // Convierte a array plano (para el frontend)
        $totalQuejasTipo = array_values($rows);

        

        return Inertia::render("estadisticas", [
            'totalQuejas' => $totalQuejas,
            'porSemestreTipo' => $porSemestreTipo,
            'anonimas' => $anonimas,
            'conNombre' => $conNombre,
            'totalQuejasTipo' => $totalQuejasTipo
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
        //
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
