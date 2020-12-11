<?php

namespace App\Http\Controllers;

use App\Models\Venda;
use Illuminate\Http\Request;

class VendaController extends Controller
{
    /** @var Venda */
    private $Venda;

    public function __construct(Venda $oVenda) {
        $this->Venda = $oVenda;
    }

    public function getAll() {
        return response()->json($this->Venda->all());
    }

    public function get($iCodigo) {
        return response()->json($this->Venda->find($iCodigo));
    }

    public function insere() {
        return response()->json($this->Venda->create());
    }
}
