<?php

use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuejaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render(component: 'buzon-quejas');
})->name('buzon');

Route::post('/', [QuejaController::class, 'store'])->name('buzon.store');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [QuejaController::class, 'index'])->name('dashboard');
    Route::get('quejas', [QuejaController::class, 'quejasIndex'])->name('quejas');

    // Route::get('estadisticas', function () {
    //     return Inertia::render('estadisticas');
    // })->name('estadisticas');
    Route::resource('estadisticas', EstadisticaController::class)->names('estadisticas');

    Route::resource('tipo-de-violencia',  OptionController::class)->names('tipo-de-violencia');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
