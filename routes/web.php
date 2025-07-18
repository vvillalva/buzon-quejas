<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('buzon-quejas');
})->name('buzon-quejas');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('catalogo', function () {
        return Inertia::render('catalogo/lista-opciones');
    })->name('lista-opciones');

    Route::get('estadisticas', function () {
        return Inertia::render('estadisticas');
    })->name('estadisticas');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
