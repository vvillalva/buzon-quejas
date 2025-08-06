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
            'usuarios.view',
            'usuarios.edit',
            'usuarios.create',
            'usuarios.delete',
            'roles.view',
            'roles.edit',
            'roles.create',
            'roles.delete'
        ];
        foreach ( $permissions as $key => $value ){
            Permission::create(["name" => $value]);
        }
    }
}
