<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemVenda extends Model
{
    use HasFactory;

    protected $table = 'tbitemvenda';

    protected $primaryKey = ['vencodigo', 'procodigo'];

    public $incrementing = false;

    protected $fillable = ['vencodigo','procodigo','itvquantidade'];

    public function vendas() {
        $this->hasMany(Venda::class, 'vencodigo');
    }

    public function produtos() {
        $this->hasMany(Produto::class, 'procodigo');
    }
}
