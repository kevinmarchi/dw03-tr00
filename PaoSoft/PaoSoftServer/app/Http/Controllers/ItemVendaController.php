<?php

namespace App\Http\Controllers;

use App\Models\ItemVenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemVendaController extends Controller
{
    /** @var ItemVenda */
    private $ItemVenda;

    public function __construct(ItemVenda $oItemVenda) {
        $this->ItemVenda = $oItemVenda;
    }

    public function getAll() {
        return response()->json($this->ItemVenda->all());
    }

    public function getByVenda($iCodigoVenda) {
        return response()->json($this->ItemVenda->find($iCodigoVenda));
    }

    public function insere(Request $oRequest) {
        $aData = $oRequest->all();
        return response()->json($this->ItemVenda->create($aData));
    }

    public function altera(Request $oRequest) {
        $aData = $oRequest->all();
        DB::table('tbitemvenda')->where('vencodigo', '=', $aData['vencodigo'])
                                     ->where('procodigo', '=', $aData['procodigo'])
                                     ->update(['itvquantidade' => $aData['itvquantidade']]);

        return response()->json(['data' => ['msg' => 'ItemVenda alterado com sucesso']]);
    }

    public function delete($iCodigoVenda, $iCodigoProduto) {
        DB::table('tbitemvenda')->where('vencodigo', '=', $iCodigoVenda)
                                     ->where('procodigo', '=', $iCodigoProduto)->delete();

        return response()->json(['data' => ['msg' => 'Produto Removido com sucesso']]);
    }

}
