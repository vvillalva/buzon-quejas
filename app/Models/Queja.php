<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queja extends Model
{
    use HasFactory;

    // Si el nombre de la tabla no es 'quejas', asegúrate de especificarlo
    protected $table = 'quejas';

    // Campos
    protected $fillable = ['nombre', 'correo', 'tel', 'tipo_violencia', 'mensaje', 'folio', 'estatus'];
}
