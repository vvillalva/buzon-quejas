<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Option;
use App\Models\Catalogo;
use Inertia\Inertia;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // El nombre de la ruta puede ser por ejemplo "tipo-de-violencia.index"
        $routeName = $request->route()->getName(); // e.g., "tipo-de-violencia.index"
        $resourceName = explode('.', $routeName)[0]; // "tipo-de-violencia"

        return Inertia::render("catalogo/lista-opciones", [
            'opciones' => Option::all(),
            'resourceName' => $resourceName,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // El nombre de la ruta puede ser por ejemplo "tipo-de-violencia.index"
        $routeName = $request->route()->getName(); // e.g., "tipo-de-violencia.index"
        $resourceName = explode('.', $routeName)[0]; // "tipo-de-violencia"
        return Inertia::render("catalogo/agregar-opcion", [
            'catalogos' => Catalogo::all(),
            'resourceName' => $resourceName,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // El nombre de la ruta puede ser por ejemplo "tipo-de-violencia.index"
        $routeName = $request->route()->getName(); // e.g., "tipo-de-violencia.index"
        $request->validate(
            [
                "nombre" => "required",
                "estatus",
                "catalogo_id"
            ],
            [
                "nombre.required" => "El nombre es obligatorio para crear la opción."
            ]
        );


        Option::create(
            $request->only(["nombre", "estatus", "catalogo_id"])
        );

        return to_route($routeName);
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
    public function edit(Request $request, string $id)
    {
        // El nombre de la ruta puede ser por ejemplo "tipo-de-violencia.index"
        $routeName = $request->route()->getName(); // e.g., "tipo-de-violencia.index"
        $resourceName = explode('.', $routeName)[0]; // "tipo-de-violencia"
        $option = Option::find($id);
        return Inertia::render("catalogo/editar-opcion", [
            "opcion" => $option,
            'resourceName' => $resourceName,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $routeName = $request->route()->getName(); // p.ej. "tipo-de-violencia" o "tipo-de-violencia.edit"
        $baseRoute = explode('.', $routeName)[0]; // toma sólo "tipo-de-violencia"
        $request->validate(
            [
                "nombre",
                "estatus"
            ]
        );

        $option = Option::find($id);

        $option->nombre = $request->input('nombre');
        $option->estatus = $request->input('estatus');

        $option->save();

        return to_route("{$baseRoute}.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
