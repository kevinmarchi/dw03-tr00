class ControllerProduto {

    constructor() {
        this.aProdutos          = [];
        this.oProduto           = '';
        this.iIndiceSelecionado = 0;
        this.ViewProduto        = new ViewProduto();                    
    }

    listarDados() {        
        this.getAllProdutosByApi();         
        this.ViewProduto.populaTabela(this.aProdutos);
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

    limpaFormulario() {
        document.querySelector('#nome').value = '';
        document.querySelector('#descricao').value = '';
        document.querySelector('#valor').value = '';
    }

    preparaInsere() {
        let oController = this;        
        this.ViewProduto.criaModal();        
        document.querySelector('#btnGravar').addEventListener('click', function () {
            oController.insere();
        });
    }
    
    insere() {
        let sNome      = document.querySelector('#nome').value;
        let sDescricao = document.querySelector('#descricao').value;
        let sValor     = parseFloat(document.querySelector('#valor').value);
        let aDados     = {pronome: sNome, prodescricao: sDescricao, provalor: sValor};
        let sDados     = JSON.stringify(aDados);
        this.insereProdutoByApi(sDados);

        this.listarDados();
        this.limpaFormulario();
    }

    exclui() {
        let iCodigo = parseInt(this.iIndiceSelecionado);        
        this.excluiProdutoByApi(iCodigo);
        this.listarDados();
    }

    preparaAltera() {
        let oController = this;
        let iCodigo = parseInt(this.iIndiceSelecionado);
        this.getProdutoByApi(iCodigo)
        this.ViewProduto.criaModal(this.oProduto);
        document.querySelector('#btnGravar').addEventListener('click', function () {
            oController.altera();
        });
    }

    altera() {
        let sCodigo    = document.querySelector('#codigo').value;
        let sNome      = document.querySelector('#nome').value;
        let sDescricao = document.querySelector('#descricao').value;
        let sValor     = parseFloat(document.querySelector('#valor').value);
        let aDados     = {procodigo: sCodigo ,pronome: sNome, prodescricao: sDescricao, provalor: sValor};
        let sDados     = JSON.stringify(aDados);

        this.alteraProdutoByApi(sDados);
        this.listarDados();
        this.limpaFormulario();

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

    insereProdutoByApi(sDados) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('POST', 'http://127.0.0.1:8000/api/produtos', false);
        oRequest.setRequestHeader('Content-Type', 'application/json');
        oRequest.send(sDados);
    }  
    
    excluiProdutoByApi(iCodigo) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('DELETE', `http://127.0.0.1:8000/api/produtos/${iCodigo}`, false);
        oRequest.send();
    }

    alteraProdutoByApi(sDados) {
        let oRequest = new XMLHttpRequest();
        oRequest.open('PUT', 'http://127.0.0.1:8000/api/produtos', false);
        oRequest.setRequestHeader('Content-Type', 'application/json');
        oRequest.send(sDados);
    }

}