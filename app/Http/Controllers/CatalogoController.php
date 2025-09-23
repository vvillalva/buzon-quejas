<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Catalogo;
use Inertia\Inertia;
use App\Models\Bitacora;
use Illuminate\Support\Facades\Auth;

class CatalogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("catalogos/lista-catalogos", [
            'catalogos' => Catalogo::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("catalogos/agregar-catalogo");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "nombre" => "required"
            ],
            [
                "nombre.required" => "El nombre es obligatorio para crear el catalogo."
            ]
        );

        $catalogo = Catalogo::create(
            $request->only(["nombre"])
        );

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Creó un nuevo catalogo: '.$catalogo->id,
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        return to_route('catalogos.index');
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
        // $catalogo = Catalogo::find($id);
        // return Inertia::render("catalogo/editar-opcion", [
        //     "catalogo" => $catalogo
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                "nombre" => "required"
            ],
            [
                "nombre.required" => "El nombre es obligatorio para editar el catalogo."
            ]
        );

        $catalogo = Catalogo::find($id);

        $catalogo->nombre = $request->nombre;

        $catalogo->save();

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Editó un catalogo: '.$catalogo->id,
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        return to_route('catalogos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $catalogo = Catalogo::find($id);

        Bitacora::create([
            'fk_usuario'     => Auth::id(),
            'operacion'      => 'Eliminó un catalogo: '.$catalogo->id,
            'fecha_operacion'=> now(),
            'ip'             => request()->ip(),
            'pc'             => gethostname(),
        ]);

        Catalogo::destroy($id);

        return to_route("catalogos.index");
    }
}
