<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('App\Http\Controllers')->group(function () {
    Route::prefix('produtos')->group(function () {
        Route::get   ('/'         , 'ProdutoController@getAll');
        Route::get   ('/{iCodigo}', 'ProdutoController@get');
        Route::post  ('/'         , 'ProdutoController@insere');
        Route::put   ('/'         , 'ProdutoController@altera');
        Route::delete('/{iCodigo}', 'ProdutoController@delete');
    });

    Route::prefix('receitas')->group(function () {
        Route::get   ('/'         , 'ReceitaController@getAll');
        Route::get   ('/{iCodigo}', 'ReceitaController@get');
        Route::post  ('/'         , 'ReceitaController@insere');
        Route::put   ('/'         , 'ReceitaController@altera');
        Route::delete('/{iCodigo}', 'ReceitaController@delete');
    });

    Route::prefix('vendas')->group(function () {
        Route::get   ('/'         , 'VendaController@getAll');
        Route::get   ('/{iCodigo}', 'VendaController@get');
        Route::post  ('/'         , 'VendaController@insere');
    });

    Route::prefix('itemvenda')->group(function () {
        Route::get   ('/'                               , 'ItemVendaController@getAll');
        Route::get   ('/{iCodigoVenda}'                 , 'ItemVendaController@getByVenda');
        Route::post  ('/'                               , 'ItemVendaController@insere');
        Route::put   ('/'                               , 'ItemVendaController@altera');
        Route::delete('/{iCodigoVenda}/{iCodigoProduto}', 'ItemVendaController@delete');
    });
});
