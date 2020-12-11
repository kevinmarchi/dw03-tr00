<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableItemVenda extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbitemvenda', function (Blueprint $table) {
            $table->unsignedBigInteger('vencodigo');
            $table->unsignedBigInteger('procodigo');
            $table->integer('itvquantidade');
            $table->timestamps();

            $table->foreign(['vencodigo'])->references(['vencodigo'])->on('tbvendas');
            $table->foreign(['procodigo'])->references(['procodigo'])->on('tbprodutos');
            $table->primary(['procodigo', 'vencodigo']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbitemvenda');
    }
}
