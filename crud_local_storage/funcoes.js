$(document).ready(function(){    
    aTbProdutos = [];
    sOperacao = "I";
    iIndiceSelecionado = -1;    
    if (localStorage.getItem("tbProdutos")) {
        aTbProdutos = localStorage.getItem("tbProdutos");
        aTbProdutos = JSON.parse(aTbProdutos);        
    }
    listarRegistros();
});

function incluirRegistro() {       
    sCodigo = aTbProdutos[aTbProdutos.length - 1];
    oCodigo = JSON.parse(sCodigo);
    iCodigo = (oCodigo.codigo) + 1;          
    var oProduto = JSON.stringify({
        codigo        : iCodigo,
        nome          : $("#nome").val(),
        descricao     : $("#descricao").val(),
        preco         : $("#preco").val(),        
    });     
    aTbProdutos.push(oProduto);
    localStorage.setItem("tbProdutos", JSON.stringify(aTbProdutos));
    listarRegistros();
    resetarCampos();
    return true;
}

function editarRegistro() {
    aTbProdutos[iIndiceSelecionado] = JSON.stringify({
        codigo        : $("#codigo").val(),
        nome          : $("#nome").val(),
        descricao     : $("#descricao").val(),
        preco         : $("#preco").val(),        
    });
    localStorage.setItem("tbProdutos", JSON.stringify(aTbProdutos));
    sOperacao = "I";
    listarRegistros();
    resetarCampos();
    return true;
}

function excluirRegistro() {
    aTbProdutos.splice(iIndiceSelecionado, 1);
    localStorage.setItem("tbProdutos", JSON.stringify(aTbProdutos));  
    sOperacao = "I";
}

function listarRegistros() {
    $("#tbListar tbody").html("");
    for (var iCont in aTbProdutos) {
        var oProduto = JSON.parse(aTbProdutos[iCont]);
        var sNovaLinha = "<tr>";
        sNovaLinha += "<td><input type='radio' id='checkSelecionado' value='"+iCont+"' class='form-control' name='selecionado'></td>"
        sNovaLinha += "<td>"+oProduto.codigo+"</td>";
        sNovaLinha += "<td>"+oProduto.nome+"</td>";
        sNovaLinha += "<td>"+oProduto.descricao+"</td>";
        sNovaLinha += "<td>"+oProduto.preco+"</td>";        
        sNovaLinha += "</tr>";        
        $("#tbListar tbody").append(sNovaLinha);
    }
    
}

$("#frmCadastro").on("submit", function() {
    event.preventDefault();     
    if (sOperacao == "I") {
        return incluirRegistro();
    }
    return editarRegistro();
});

$("#tbListar").on("click", "#checkSelecionado", function(){        
    iIndiceSelecionado = parseInt($(this).attr("value"));    
});

$("#btnIncluir").click(function(){
    resetarCampos();
    $("#btnGravar").show();
});

$("#btnAlterar").click(function(){
    sOperacao = "E";
    resetarCampos();
    carregaCampos();
    $("#btnGravar").show();
});

$("#btnExcluir").click(function(){
    sOperacao = "E";
    excluirRegistro();
    listarRegistros();
});

$("#btnVisualizar").click(function(){
    resetarCampos();
    carregaCampos();
    $("#codigo")   .attr('readonly', true);
    $("#nome")     .attr('readonly', true);
    $("#descricao").attr('readonly', true);
    $("#preco")    .attr('readonly', true);
    $("#btnGravar").hide();    
});

function carregaCampos() {
    var oProduto = JSON.parse(aTbProdutos[iIndiceSelecionado]);
    $("#codigo")   .val(oProduto.codigo);
    $("#nome")     .val(oProduto.nome);
    $("#descricao").val(oProduto.descricao);
    $("#preco")    .val(oProduto.preco);    
    $("#nome").focus();
}

function resetarCampos() {
    $("#frmCadastro").each(function(){
        this.reset();
        $("#codigo")   .attr('readonly', true);
        $("#nome")     .attr('readonly', false);
        $("#descricao").attr('readonly', false);
        $("#preco")    .attr('readonly', false);
    });
}