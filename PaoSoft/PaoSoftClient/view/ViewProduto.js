class ViewProduto {    

    populaTabela(aProdutos) {
        let oTabela = document.querySelector('#tbListarProdutoBody');
        let sConteudo = '';
        aProdutos.forEach(oProduto => {                      
            sConteudo +=  `
                <tr>
                    <td><input type='radio' id='checkSelecionado' value='${oProduto.procodigo}' class='form-control' name='selecionado'></td>
                    <td>${oProduto.procodigo}</td>
                    <td>${oProduto.pronome}</td>
                    <td>${oProduto.prodescricao}</td>
                    <td>${oProduto.provalor}</td>
                </tr>
            `;
        })        
        oTabela.innerHTML = sConteudo;                    
    }    

    criaModal(oProduto) {
        if (oProduto == null) {
            oProduto = {procodigo: '', pronome:'', prodescricao:'', provalor:''};
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
                                <input type="number" name="codigo" id="codigo" autocomplete="off" disabled="true" class="form-control" required value="${oProduto.procodigo}">
                            </div>
                            <div class="form-group">
                                <label for="nome">Nome:</label>
                                <input type="text" name="nome" id="nome" class="form-control" maxlength="100" autocomplete="off" required value="${oProduto.pronome}">
                            </div>
                            <div class="form-group">
                                <label for="descricao">Descrição:</label>
                                <textarea id="descricao" class="form-control" maxlength="500" rows="6" autocomplete="off" required>${oProduto.prodescricao}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="valor">Valor:</label>
                                <input type="number" name="valor" id="valor" class="form-control" step="0.01" max="999999" required value="${oProduto.provalor}">
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

}