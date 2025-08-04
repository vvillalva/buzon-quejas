<?php

use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuejaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// O si vas directo a la vista de buzon
Route::get('/', [OptionController::class, 'indexOptions'])->name('buzon');
Route::post('/', [QuejaController::class, 'store'])->name('buzon.store');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [QuejaController::class, 'index'])->name('dashboard');
    Route::get('quejas', [QuejaController::class, 'quejasIndex'])->name('quejas');
    Route::get('quejas/{queja}/editar', [QuejaController::class, 'edit'])->name('editar-queja');
    Route::put('quejas/{queja}', [QuejaController::class, 'update'])->name('update-queja');

    Route::resource('estadisticas', EstadisticaController::class)->names('estadisticas');
    Route::resource('tipo-de-violencia',  OptionController::class)->names('tipo-de-violencia');
    Route::resource('usuarios', UserController::class)->names('usuarios');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
