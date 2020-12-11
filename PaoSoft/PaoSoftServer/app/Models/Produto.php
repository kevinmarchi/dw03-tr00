<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $table = 'tbprodutos';

    protected $primaryKey = 'procodigo';

    protected $fillable = ['pronome', 'prodescricao', 'provalor'];

    public function receitas() {
        return $this->belongsTo(Receita::class, 'rescodigo');
    }

    public function itemVenda() {
        return $this->belongsTo(ItemVenda::class, 'procodigo');
    }

}
