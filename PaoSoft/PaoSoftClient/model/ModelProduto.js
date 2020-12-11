class ModelProduto {

    constructor(iCodigo, sNome, sDescricao, iValor) {
        this.codigo    = iCodigo;
        this.nome      = sNome;
        this.descricao = sDescricao;
        this.valor     = iValor;
        Object.freeze(this);
    }

    get codigo() {
        return this.codigo;
    }

    get nome() {
        return this.nome;
    }

    get descricao() {
        return this.descricao;
    }    

    get valor() {
        return this.valor;
    }
    
}