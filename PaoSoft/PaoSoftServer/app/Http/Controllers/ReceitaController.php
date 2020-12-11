<?php

namespace App\Http\Controllers;

use App\Models\Receita;
use Illuminate\Http\Request;

class ReceitaController extends Controller
{
    /** @var Receita */
    private $Receita;

    public function __construct(Receita $oReceita) {
        $this->Receita = $oReceita;
    }

    public function getAll() {
        return response()->json($this->Receita->all());
    }

    public function get($iCodigo) {
        return response()->json($this->Receita->find($iCodigo));
    }

    public function insere(Request $oRequest) {
        $aData = $oRequest->all();
        return response()->json($this->Receita->create($aData));
    }

    public function altera(Request $oRequest) {
        $aData = $oRequest->all();

        $oReceita = $this->Receita->find($aData['rescodigo']);
        $oReceita->update($aData);

        return response()->json($oReceita);
    }

    public function delete($iCodigo) {
        $oReceita = $this->Receita->find($iCodigo);
        $oReceita->delete();

        return response()->json(['data' => ['msg' => 'Receita Removido com sucesso']]);
    }

}
