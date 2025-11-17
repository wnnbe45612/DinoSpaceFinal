<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Verificamos si las columnas NO existen antes de agregarlas
            if (!Schema::hasColumn('users', 'edad')) {
                $table->integer('edad')->nullable();
            }
            if (!Schema::hasColumn('users', 'genero')) {
                $table->string('genero')->nullable();
            }
            if (!Schema::hasColumn('users', 'ciclo')) {
                $table->string('ciclo')->nullable();
            }
            if (!Schema::hasColumn('users', 'estado_emocional')) {
                $table->string('estado_emocional')->nullable();
            }
            if (!Schema::hasColumn('users', 'horas_sueno')) {
                $table->string('horas_sueno')->nullable();
            }
            if (!Schema::hasColumn('users', 'actividad')) {
                $table->string('actividad')->nullable();
            }
            if (!Schema::hasColumn('users', 'motivacion')) {
                $table->string('motivacion')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'edad', 
                'genero', 
                'ciclo', 
                'estado_emocional', 
                'horas_sueno', 
                'actividad', 
                'motivacion'
            ]);
        });
    }
};