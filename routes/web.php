<?php

use App\Http\Controllers\CatalogoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('buzon-quejas');
})->name('buzon-quejas');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('estadisticas', function () {
        return Inertia::render('estadisticas');
    })->name('estadisticas');

    Route::resource('catalogos', CatalogoController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
