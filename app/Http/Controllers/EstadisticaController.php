<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Queja;

class EstadisticaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
            // ---- TOTAL DE QUEJAS ----
        $totalQuejas = Queja::count();
            // ---- POR SEMESTRE----
        $porSemestreTipo = Queja::selectRaw("tipo_violencia,YEAR(created_at) as anio, CASE WHEN MONTH(created_at) BETWEEN 1 AND 6 THEN 1 ELSE 2 END as semestre, COUNT(*) as total")
            ->groupBy(
                'tipo_violencia',
                \DB::raw('YEAR(created_at)'),
                \DB::raw('CASE WHEN MONTH(created_at) BETWEEN 1 AND 6 THEN 1 ELSE 2 END')
            )
            ->orderBy('anio')
            ->orderBy('semestre')
            ->get();
            
            // ---- GRAFICA DE ANONIMO VS IDENTIFICADO ----
        $anonimas = Queja::whereNull('nombre')->orWhere('nombre', 'Anonimo')->count();
        $conNombre = $totalQuejas - $anonimas;

            // ---- GRAFICA DE TOTAL DE TIPOS DE QUEJAS ----
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

            // ---- ESTATUS DE QUEJAS ----
        $year = Carbon::now()->year;
        // 1. Trae los datos agrupados por mes y estatus
        $datos = Queja::selectRaw('MONTH(created_at) as mes, estatus, COUNT(*) as total')
            ->whereYear('created_at', $year)
            ->groupBy(Queja::raw('MONTH(created_at)'), 'estatus')
            ->orderBy('mes')
            ->get();
        // 2. Nombres de los meses
        $meses = [
            1 => 'Enero',
            2 => 'Febrero',
            3 => 'Marzo',
            4 => 'Abril',
            5 => 'Mayo',
            6 => 'Junio',
            7 => 'Julio',
            8 => 'Agosto',
            9 => 'Septiembre',
            10 => 'Octubre',
            11 => 'Noviembre',
            12 => 'Diciembre'
        ];
        // 3. Inicializa el array de chart desde enero hasta el mes actual
        $mesActual = Carbon::now()->month;
        $chartData = [];
        for ($i = 1; $i <= $mesActual; $i++) {
            $chartData[$i] = [
                'month' => $meses[$i],
                'pendiente' => 0,
                'enCurso' => 0,
                'atendido' => 0,
            ];
        }
        // 4. Llena los datos con los valores obtenidos
        foreach ($datos as $row) {
            $mes = (int) $row->mes;
            $estatus = strtolower($row->estatus);
            if ($estatus === 'pendiente') {
                $chartData[$mes]['pendiente'] = (int) $row->total;
            } elseif ($estatus === 'en-curso' || $estatus === 'en_curso' || $estatus === 'encurso') {
                $chartData[$mes]['enCurso'] = (int) $row->total;
            } elseif ($estatus === 'atendido' || $estatus === 'concluido' || $estatus === 'completado') {
                $chartData[$mes]['atendido'] = (int) $row->total;
            }
        }
        // Si quieres que el array sea indexado numéricamente (como requiere tu frontend)
        $quejasPorMesEstatus = array_values($chartData);

        return Inertia::render("estadisticas", [
            'totalQuejas' => $totalQuejas,
            'porSemestreTipo' => $porSemestreTipo,
            'anonimas' => $anonimas,
            'conNombre' => $conNombre,
            'totalQuejasTipo' => $totalQuejasTipo,
            'quejasPorMesEstatus' => $quejasPorMesEstatus,

        ]);
    }

    public function indexDashboard()
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

        $anonimas = Queja::whereNull('nombre')->orWhere('nombre', 'Anonimo')->count();
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
            $rows[$fecha][$row->tipo_violencia] = (int) $row->total;
        }
        // Convierte a array plano (para el frontend)
        $totalQuejasTipo = array_values($rows);



        return Inertia::render("dashboard", [
            'totalQuejas' => $totalQuejas,
            'porSemestreTipo' => $porSemestreTipo,
            'anonimas' => $anonimas,
            'conNombre' => $conNombre,
            'totalQuejasTipo' => $totalQuejasTipo
        ]);
    }
}
