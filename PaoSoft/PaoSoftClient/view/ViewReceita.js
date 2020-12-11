class ViewReceita {

    constructor() {
        this.sOptionProdutos = '';
    }

    populaTabela(aReceitas) {
        let oTabela = document.querySelector('#tbListarReceitaBody');
        let sConteudo = '';
        aReceitas.forEach(aReceita => {                      
            sConteudo +=  `
                <tr>
                    <td><input type='radio' id='checkSelecionado' value='${aReceita.rescodigo}' class='form-control' name='selecionado'></td>
                    <td>${aReceita.rescodigo}</td>
                    <td>${aReceita.pronome}</td>
                    <td>${aReceita.resmodopreparo}</td>
                    <td>${aReceita.resingredientes}</td>                    
                </tr>
            `;
        })        
        oTabela.innerHTML = sConteudo;
    }

    criaModal(oReceita) {
        if (oReceita == null) {
            oReceita = {rescodigo: '', procodigo:'', resmodopreparo:'', resingredientes:''};
        }                         
        let oModal = document.querySelector('#modal');
        oModal.innerHTML =  `
            <div class="modal fade" id="modalCadastros" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Produtos</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <form id="frmCadastro">
                            <div class="form-group">
                                <label for="codigo">Código:</label>
                                <input type="number" name="codigo" id="codigo" autocomplete="off" disabled="true" class="form-control" required value="${oReceita.rescodigo}">
                            </div>
                            <div class="form-group">
                                <label for="procodigo">Produto:</label>
                                <select id="procodigo" name="procodigo" class="form-control" required>
                                    ${this.sOptionProdutos}                    
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="modopreparo">Modo de preparo:</label>
                                <textarea id="modopreparo" class="form-control" maxlength="500" rows="6" autocomplete="off" required>${oReceita.resmodopreparo}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="ingredientes">Ingredientes:</label>
                                <input type="text" name="ingredientes" id="ingredientes" class="form-control" maxlength="100" autocomplete="off" required value="${oReceita.resingredientes}">
                            </div>                                                    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" id="btnGravar" class="btn btn-primary">Gravar</button>
                        </form>
                    </div>                    
                  </div>
                </div>
            </div>
        `;
    }

    criaSelectProdutos(aProdutos, iSelecionado) {
        this.sOptionProdutos = '';
        this.sOptionProdutos += '<option>Selecione...</option>'          
        aProdutos.forEach(oProduto => {
            if (iSelecionado && iSelecionado == oProduto.procodigo) {
                this.sOptionProdutos += `<option selected value="${oProduto.procodigo}">${oProduto.pronome}</option>`;                
            } else {
                this.sOptionProdutos += `<option value="${oProduto.procodigo}">${oProduto.pronome}</option>`;
            }
        });
        return this.sOptionProdutos;
    }
    
}