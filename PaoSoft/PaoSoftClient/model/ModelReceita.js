class ModelReceita {

    constructor(iCodigo, iProdutoCodigo, sModoPreparo, sIngredientes) {
        this.codigo = iCodigo;
        this.produtoCodigo = iProdutoCodigo;
        this.modoPreparo = sModoPreparo;
        this.ingredientes = sIngredientes;
        Object.freeze(this);
    }

    get codigo() {
        return this.codigo;
    }

    get produtoCodigo() {
        return this.produtoCodigo;
    }

    get modoPreparo() {
        return this.modoPreparo;
    }

    get ingredientes() {
        return this.ingredientes;
    }
    
}