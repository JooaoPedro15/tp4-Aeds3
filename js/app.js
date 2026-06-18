// Controla o acesso ao "arquivo" (vetor de bytes)
const arquivo = new Arquivo()

// Próximo ID disponível
let id = 1


// Atualiza a lista exibida na tela
function atualizarTela() {

    const produtos =
        arquivo.listar()

    Visualizador.desenhar(
        produtos
    )

}


// Insere um produto de exemplo
function inserirProduto() {

    const produto =
        new Produto(
            id,
            "Notebook",
            4500
        )

    // Converte produto → bytes
    const bytes =
        produto.serializar()

    // Salva registro no arquivo
    arquivo.adicionarRegistro(
        bytes
    )

    atualizarTela()
    id++

}


// Liga botão à ação
document
    .getElementById(
        "btnInserir"
    )
    .onclick =
        inserirProduto


// Desenha os dados ao abrir a página
atualizarTela()