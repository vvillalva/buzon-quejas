<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quejas', function (Blueprint $table) {
            $table->string('estatus')->default('pendiente'); // O puede ser integer/tinyInteger si usas catálogo de estatus
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quejas', function (Blueprint $table) {
            $table->dropColumn('estatus');
        });
    }
};