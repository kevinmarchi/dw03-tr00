class ControllerReceita {

    constructor() {
        this.aReceitas = [];
        this.oReceita = '';
        this.aProdutos = '';
        this.oProduto = '';
        this.iIndiceSelecionado = 0;
        this.ViewReceita = new ViewReceita();
    }

    listarDados() {        
        this.getAllReceitasByApi();
        this.trataListagemProduto();                      
        this.ViewReceita.populaTabela(this.aReceitas);
        this.trataItemSelecionado();                        
    }

    trataItemSelecionado() {
        let oController = this;                                
        let oCheckSelecionados = document.querySelectorAll('#checkSelecionado');
        oCheckSelecionados.forEach (oSelecionado => {
            oSelecionado.addEventListener('click', function() {                
                oController.iIndiceSelecionado = oSelecionado.value;
            });
        });        
    }

    trataListagemProduto() {
        this.aReceitas.forEach(oReceita => {
            this.getProdutoByApi(parseInt(oReceita.procodigo));
            oReceita.pronome = this.oProduto.pronome;
        });
    }

    limpaFormulario() {
        document.querySelector('#codigo').value = '';        
        document.querySelector('#modopreparo').value = '';
        document.querySelector('#ingredientes').value = '';        
    }

    preparaInsere() {
        let oController = this;      
        this.getAllProdutosByApi();
        this.ViewReceita.criaSelectProdutos(this.aProdutos, null);          
        this.ViewReceita.criaModal();                              
        document.querySelector('#btnGravar').addEventListener('click', function () {
            oController.insere();
        });
    }
    
    insere() {
        let iProCodigo    = document.querySelector('#procodigo').value;
        let sModoPreparo  = document.querySelector('#modopreparo').value;
        let sIngredientes = document.querySelector('#ingredientes').value;
        let aDados     = {procodigo: iProCodigo, resmodopreparo: sModoPreparo, resingredientes: sIngredientes};
        let sDados     = JSON.stringify(aDados);
        this.insereReceitaByApi(sDados);

        this.listarDados();
        this.limpaFormulario();
    }

    exclui() {
        let iCodigo = parseInt(this.iIndiceSelecionado);        
        this.excluiReceitaByApi(iCodigo);
        this.listarDados();
    }

    preparaAltera() {
        let oController = this;
        let iCodigo = parseInt(this.iIndiceSelecionado);
        this.getReceitaByApi(iCodigo);
        this.getAllProdutosByApi();
        this.ViewReceita.criaSelectProdutos(this.aProdutos, this.oReceita.procodigo);        
        this.ViewReceita.criaModal(this.oReceita);                 
        document.querySelector('#btnGravar').addEventListener('click', function () {
            oController.altera();
        });
    }

    altera() {
        let iCodigo       = parseInt(document.querySelector('#codigo').value);
        let iProCodigo    = parseInt(document.querySelector('#procodigo').value);
        let sModoPreparo  = document.querySelector('#modopreparo').value;
        let sIngredientes = document.querySelector('#ingredientes').value;
        let aDados     = {rescodigo:iCodigo ,procodigo: iProCodigo ,resmodopreparo: sModoPreparo, resingredientes: sIngredientes};
        let sDados     = JSON.stringify(aDados);

        this.alteraReceitaByApi(sDados);
        this.listarDados();
        this.limpaFormulario();

    }

    getAllReceitasByApi() {        
        let oRequest = new XMLHttpRequest();
        oRequest.open('GET', 'http://127.0.0.1:8000/api/receitas', false);

        oRequest.onreadystatechange = () => {
            if (oRequest.readyState == 4) {
                if (oRequest.status == 200) {
                    this.aReceitas = JSON.parse(oRequest.responseText);                    
                }
            }
        }

        oRequest.send();
    }

    getReceitaByApi(iCodigo) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('GET', `http://127.0.0.1:8000/api/receitas/${iCodigo}`, false);
        oRequest.onreadystatechange = () => {
            if (oRequest.readyState == 4) {
                if (oRequest.status == 200) {
                    this.oReceita = JSON.parse(oRequest.responseText);                    
                }
            }
        }
        oRequest.send();
    }

    insereReceitaByApi(sDados) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('POST', 'http://127.0.0.1:8000/api/receitas', false);
        oRequest.setRequestHeader('Content-Type', 'application/json');
        oRequest.send(sDados);
    }

    excluiReceitaByApi(iCodigo) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('DELETE', `http://127.0.0.1:8000/api/receitas/${iCodigo}`, false);
        oRequest.send();
    }

    alteraReceitaByApi(sDados) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('PUT', 'http://127.0.0.1:8000/api/receitas', false);
        oRequest.setRequestHeader('Content-Type', 'application/json');
        oRequest.send(sDados);
    }

    getAllProdutosByApi() {        
        let oRequest = new XMLHttpRequest();
        oRequest.open('GET', 'http://127.0.0.1:8000/api/produtos', false);

        oRequest.onreadystatechange = () => {
            if (oRequest.readyState == 4) {
                if (oRequest.status == 200) {
                    this.aProdutos = JSON.parse(oRequest.responseText);                    
                }
            }
        }

        oRequest.send();
    }

    getProdutoByApi(iCodigo) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('GET', `http://127.0.0.1:8000/api/produtos/${iCodigo}`, false);
        oRequest.onreadystatechange = () => {
            if (oRequest.readyState == 4) {
                if (oRequest.status == 200) {
                   this.oProduto = JSON.parse(oRequest.responseText);                    
                }
            }
        }
        oRequest.send();
    }

}