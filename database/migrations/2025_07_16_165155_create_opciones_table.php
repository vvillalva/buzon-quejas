<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('opciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->boolean('estatus');
            $table->unsignedBigInteger('catalogo_id');
            $table->timestamps();

            // Definir la relación de clave foránea
            $table->foreign('catalogo_id')
                  ->references('id')         
                  ->on('catalogos')           
                  ->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opciones');
    }
};
