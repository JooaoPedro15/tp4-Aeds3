class Visualizador {

    /*
        Responsável por mostrar os produtos na tela.

        Entrada:
        [
            Produto,
            Produto,
            ...
        ]

        Saída:
        HTML exibido dentro da página

        Esta classe NÃO salva dados.
        Ela apenas transforma objetos
        em elementos visuais.
    */

    static desenhar(produtos) {

        // Área onde os produtos aparecem
        const div =
            document.getElementById(
                "visualizacao"
            )


        /*
            Caso não exista nenhum produto,
            mostramos uma mensagem simples
            ao invés de deixar a tela vazia.
        */

        if (
            produtos.length === 0
        ) {

            div.innerHTML =
                "Nenhum produto cadastrado"

            return

        }


        /*
            Limpa a tela antes de redesenhar.

            Isso evita que os mesmos produtos
            apareçam duplicados.
        */

        div.innerHTML = ""


        /*
            Percorre todos os produtos.

            Para cada produto:

            Produto
            ↓
            HTML
            ↓
            Tela
        */

        produtos.forEach(

            produto => {

                div.innerHTML +=

                `
                <div class="produto">

                    <strong>ID:</strong>
                    ${produto.id}

                    <br>

                    <strong>Nome:</strong>
                    ${produto.nome}

                    <br>

                    <strong>Preço:</strong>
                    R$ ${produto.preco}

                </div>
                `

            }

        )

    }

}