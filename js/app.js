const arquivo = new Arquivo();

//dados do formulario
const inputId = document.getElementById("IdForm");
const inputNome = document.getElementById("NomeForm");
const inputPreco = document.getElementById("PrecoForm");

//leitor
window.inspecionar = function (operacao, lapide, tamanho, id, nome, preco) {
  if (operacao !== "-")
    document.getElementById("Operacao").innerHTML = operacao;
  if (lapide !== "-") document.getElementById("Lapide").innerHTML = lapide;
  if (tamanho !== "-") document.getElementById("Tamanho").innerHTML = tamanho;
  if (id !== "-") document.getElementById("Id").innerHTML = id;
  if (nome !== "-") document.getElementById("Nome").innerHTML = nome;
  if (preco !== "-") document.getElementById("Preco").innerHTML = preco;
};

window.limparInspecao = function () {
  document.getElementById("Lapide").innerHTML = "-";
  document.getElementById("Tamanho").innerHTML = "-";
  document.getElementById("Id").innerHTML = "-";
  document.getElementById("Nome").innerHTML = "-";
  document.getElementById("Preco").innerHTML = "-";
};

//operacao
function mostrarAcaoCrud(textoOperacao, produto, lapideTexto = "Ativo") {
  const tamanhoTexto = produto
    .serializar()
    .length.toString(16)
    .toUpperCase()
    .padStart(2, "0");

  document.getElementById("Operacao").innerHTML = textoOperacao;
  document.getElementById("Lapide").innerHTML = lapideTexto;
  document.getElementById("Tamanho").innerHTML = tamanhoTexto;
  document.getElementById("Id").innerHTML = produto.id;
  document.getElementById("Nome").innerHTML = produto.nome;
  document.getElementById("Preco").innerHTML = "R$ " + produto.preco;

  setTimeout(() => {
    limparInspecao();
    document.getElementById("Operacao").innerHTML = "-";
  }, 4000);
}

//coloca os dados do arquivo no visualizador
function atualizarTela() {
  const produtos = arquivo.listar();
  Visualizador.desenhar(produtos);
}

//destacar registro em uma ação CRUD
function destacarRegistro(id, classeAnimacao) {
  const elemento = document.getElementById(`reg-${id}`);
  if (elemento) {
    elemento.classList.add(classeAnimacao);

    //se nao for excluirl ele remove a cor em 4 segundos
    if (classeAnimacao != "destaque-excluir") {
      setTimeout(() => {
        elemento.classList.remove(classeAnimacao);
      }, 4000);
    }
  }
}

//auto identificacao
function novoId() {
  const registros = arquivo.listar();

  if (registros.length === 0) {
    return 1;
  }

  let maiorId = 0;
  registros.forEach((item) => {
    const produto = item.produto || item;

    if (produto.id > maiorId) {
      maiorId = produto.id;
    }
  });

  return maiorId + 1;
}

//CRUD
//inserir
function inserir() {
  const idAtual = novoId();
  const nome = inputNome.value;
  const preco = Number(inputPreco.value);

  if (!nome || !preco) {
    alert("Preencha os campos (Nome e Preço) para realizar a ação!");
    return;
  }

  const produto = new Produto(idAtual, nome, preco);
  arquivo.adicionarRegistro(produto.serializar());

  atualizarTela();
  destacarRegistro(idAtual, "destaque-inserir");
  mostrarAcaoCrud("Inserção", produto);
  limparFormulario();
}

//buscar
function buscar() {
  const id = Number(inputId.value);
  if (!id) {
    alert("Não é possivel realizar esta ação, preencha o ID!");
    return;
  }

  const produto = arquivo.buscar(id);
  if (produto) {
    inputNome.value = produto.nome;
    inputPreco.value = produto.preco;
    destacarRegistro(id, "destaque-buscar");
    mostrarAcaoCrud("Busca", produto);
  } else {
    alert("Produto não encontrado.");
  }
}

//alterar
function alterar() {
  const id = Number(inputId.value);
  const nome = inputNome.value;
  const preco = Number(inputPreco.value);

  if (!id || !nome || !preco) {
    alert(
      "Não é possível alterar este dado, os campos Nome ou Preço não foram preenchidos!",
    );
    return;
  }

  const novoProduto = new Produto(id, nome, preco);
  const sucesso = arquivo.alterar(id, novoProduto);

  if (sucesso) {
    atualizarTela();
    destacarRegistro(id, "destaque-alterar");
    mostrarAcaoCrud("Alteração", novoProduto);
    limparFormulario();
  } else {
    alert("ID não encontrado para alteração.");
  }
}

//excluir
function excluir() {
  const id = Number(inputId.value);
  if (!id) {
    alert("Não é possivel realizar esta ação, preencha o ID!");
    return;
  }

  const produto = arquivo.buscar(id);

  const sucesso = arquivo.excluir(id);
  if (sucesso) {
    atualizarTela();
    destacarRegistro(id, "destaque-excluir");
    mostrarAcaoCrud("Exclusão", produto, "Excluído");
    alert("Excluído com sucesso!");
    limparFormulario();
  } else {
    alert("Produto não encontrado.");
  }
}

//limpar o formulario
function limparFormulario() {
  inputId.value = "";
  inputNome.value = "";
  inputPreco.value = "";
}

//botoes
document.getElementById("btnInserir").onclick = inserir;
document.getElementById("btnBuscar").onclick = buscar;
document.getElementById("btnAlterar").onclick = alterar;
document.getElementById("btnExcluir").onclick = excluir;

atualizarTela(); //atualiza tela
