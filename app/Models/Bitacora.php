<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    protected $table = 'bitacora';

    protected $fillable = [
        'fk_usuario',
        'operacion',
        'fecha_operacion',
        'ip',
        'pc',
    ];

    public $timestamps = true;

    public function usuario()
    {
        return $this->belongsTo(User::class, 'fk_usuario');
    }
}
