<?php

use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuejaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

// O si vas directo a la vista de buzon
Route::get('/', [OptionController::class, 'indexOptions'])->name('buzon');
Route::post('/', [QuejaController::class, 'store'])->name('buzon.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [QuejaController::class, 'index'])->name('dashboard');
    //Quejas Routes
    Route::get('quejas', [QuejaController::class, 'quejasIndex'])->name('quejas');
    Route::get('quejas/{queja}/detalles', [QuejaController::class, 'show'])->name('ver-queja');
    Route::get('quejas/{queja}/editar', [QuejaController::class, 'edit'])->name('editar-queja')
                ->middleware('permission:editar.quejas');
    Route::put('quejas/{queja}', [QuejaController::class, 'update'])->name('update-queja');
    //Estadisticas Routes
    Route::resource('estadisticas', EstadisticaController::class)->names('estadisticas');
    //Usuarios Routes
    Route::resource('usuarios', UserController::class)->names('usuarios')
                    ->only(['create', 'store'])
                    ->middleware('permission:crear.usuarios');
    Route::resource('usuarios', UserController::class)->names('usuarios')
                    ->only(['edit', 'update'])
                    ->middleware('permission:editar.usuarios');
    Route::resource('usuarios', UserController::class)->names('usuarios')
                    ->only(['destroy'])
                    ->middleware('permission:eliminar.usuarios');
    Route::resource('usuarios', UserController::class)->names('usuarios')
                    ->only(['index', 'show'])
                    ->middleware('permission:ver.usuarios|crear.usuarios|editar.usuarios|eliminar.usuarios');
    //Catalogos Routes
    Route::resource('catalogos', CatalogoController::class)->names('catalogos')
                    ->only(['create', 'store'])
                    ->middleware('permission:crear.catalogos');
    Route::resource('catalogos', CatalogoController::class)->names('catalogos')
                    ->only(['edit', 'update'])
                    ->middleware('permission:editar.catalogos');
    Route::resource('catalogos', CatalogoController::class)->names('catalogos')
                    ->only(['destroy'])
                    ->middleware('permission:eliminar.catalogos');
    Route::resource('catalogos', CatalogoController::class)->names('catalogos')
                    ->only(['index', 'show'])
                    ->middleware('permission:ver.catalogos|crear.catalogos|editar.catalogos|eliminar.catalogos');

    //Tipo de Violencia Routes
    Route::resource('tipo-de-violencia', OptionController::class)->names('tipo-de-violencia')
                    ->only(['create', 'store'])
                    ->middleware('permission:crear.opciones');
    Route::resource('tipo-de-violencia', OptionController::class)->names('tipo-de-violencia')
                    ->only(['edit', 'update'])
                    ->middleware('permission:editar.opciones');
    Route::resource('tipo-de-violencia', OptionController::class)->names('tipo-de-violencia')
                    ->only(['destroy'])
                    ->middleware('permission:eliminar.opciones');
    Route::resource('tipo-de-violencia', OptionController::class)->names('tipo-de-violencia')
                    ->only(['index', 'show'])
                    ->middleware('permission:ver.opciones|crear.opciones|editar.opciones|eliminar.opciones');

    //Roles Routes
    Route::resource('roles', RoleController::class)->names('roles')
                    ->only(['create', 'store'])
                    ->middleware('permission:crear.roles');
    Route::resource('roles', RoleController::class)->names('roles') 
                    ->only(['edit', 'update'])
                    ->middleware('permission:editar.roles');
    Route::resource('roles', RoleController::class)->names('roles') 
                    ->only(['destroy'])
                    ->middleware('permission:eliminar.roles');
    Route::resource('roles', RoleController::class)->names('roles')
                    ->only(['show', 'index'])
                    ->middleware('permission:ver.roles|crear.roles|editar.roles|eliminar.roles');

});

// Fallback 404 (sólo cuando ninguna ruta coincide)
Route::fallback(function (Request $request) {
    // Para Inertia/React, renderiza tu página de error
    return Inertia::render('Error', ['status' => 404])
        ->toResponse($request)
        ->setStatusCode(404);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
