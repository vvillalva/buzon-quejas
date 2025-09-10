<?php

use App\Http\Controllers\UserController;

// Rutas API
Route::get('/users', [UserController::class, 'allUsers']); // Ver todos los usuarios
Route::get('/users/{id}', [UserController::class, 'showUser']); // Ver un usuario específico
Route::post('/users', [UserController::class, 'createUser']); // Crear un nuevo usuario
Route::put('/users/{id}', [UserController::class, 'updateUser']); // Actualizar un usuario
Route::delete('/users/{id}', [UserController::class, 'destroyUser']); // Eliminar un usuario