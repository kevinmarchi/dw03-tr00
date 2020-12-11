<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableReceitas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbreceitas', function (Blueprint $table) {
            $table->id('rescodigo');
            $table->unsignedBigInteger('procodigo');
            $table->text('resmodopreparo');
            $table->text('resingredientes');
            $table->timestamps();

            $table->foreign(['procodigo'])->references(['procodigo'])->on('tbprodutos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbreceitas');
    }
}
