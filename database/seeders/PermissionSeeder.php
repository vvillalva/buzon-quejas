<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    //TODO: TERMINAR DE VER VIDEO 34:46
    public function run(): void
    {
        $permissions = [
            'ver.usuarios',
            'editar.usuarios',
            'crear.usuarios',
            'eliminar.usuarios',
            'ver.roles',
            'editar.roles',
            'crear.roles',
            'eliminar.roles',
            'ver.estadisticas',
            'editar.estadisticas',
            'crear.estadisticas',
            'eliminar.estadisticas',
            'ver.quejas',
            'editar.quejas',
            'crear.quejas',
            'eliminar.quejas',
            'ver.catalogos',
            'editar.catalogos',
            'crear.catalogos',
            'eliminar.catalogos',
            'ver.opciones',
            'editar.opciones',
            'crear.opciones',
            'eliminar.opciones'

        ];
        foreach ( $permissions as $key => $value ){
            Permission::create(["name" => $value]);
        }
    }
}
