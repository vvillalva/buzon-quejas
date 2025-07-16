<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Opcion extends Model
{
    protected $table = 'opciones';

    protected $fillable = ['nombre','estatus','catalogo_id'];


    // cada Opción pertenece a un Catalogo
    public function catalogo()
    {
        return $this->belongsTo(Catalogo::class, 'catalogo_id');
    }

}
