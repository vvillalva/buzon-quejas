<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Catalogo;
use Inertia\Inertia;

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

        Catalogo::create(
            $request->only(["nombre"])
        );

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

        return to_route('catalogos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Catalogo::destroy($id);

        return to_route("catalogos.index");
    }
}
