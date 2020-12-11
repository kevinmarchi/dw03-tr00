<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    /** @var Produto */
    private $Produto;

    public function __construct(Produto $oProduto) {
        $this->Produto = $oProduto;
    }

    public function getAll() {
        return response()->json($this->Produto->all());
    }

    public function get($iCodigo) {
        return response()->json($this->Produto->find($iCodigo));
    }

    public function insere(Request $oRequest) {
        $aData = $oRequest->all();
        return response()->json($this->Produto->create($aData));
    }

    public function altera(Request $oRequest) {
        $aData = $oRequest->all();

        $oProduto = $this->Produto->find($aData['procodigo']);
        $oProduto->update($aData);

        return response()->json($oProduto);
    }

    public function delete($iCodigo) {
        $oProduto = $this->Produto->find($iCodigo);
        $oProduto->delete();

        return response()->json(['data' => ['msg' => 'Produto Removido com sucesso']]);
    }
}
