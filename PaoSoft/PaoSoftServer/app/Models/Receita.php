<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receita extends Model
{
    use HasFactory;

    protected $table = 'tbreceitas';

    protected $primaryKey = 'rescodigo';

    protected $fillable = ['procodigo', 'resmodopreparo', 'resingredientes'];

    public function produtos() {
        return $this->hasMany(Produto::class, 'procodigo');
    }
}
