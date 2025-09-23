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
        Schema::create('bitacora', function (Blueprint $table) {
            $table->id('id_bitacora');
            $table->bigInteger('fk_usuario')->unsigned(false); // signed para coincidir
            $table->foreign('fk_usuario')->references('id')->on('users')->onDelete('cascade');
            $table->string('operacion', 255);
            $table->timestamp('fecha_operacion')->useCurrent();
            $table->string('ip', 45)->nullable();
            $table->string('pc', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bitacora');
    }
};
