<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalogo extends Model
{
    protected $table = 'catalogos';
    protected $fillable = ['nombre'];

    // Relación uno a muchos con las Opciones
    public function opciones()
    {
        return $this->hasMany(Option::class, 'catalogo_id');
    }
}
