class Arquivo {

    constructor() {

        // Representa o conteúdo do arquivo em bytes
        this.bytes = []

        // Recupera os dados salvos anteriormente
        this.carregar()
    }


    // Salva o vetor de bytes no LocalStorage
    salvar() {

        localStorage.setItem(
            "arquivo",
            JSON.stringify(this.bytes)
        )

    }


    // Carrega o vetor salvo
    carregar() {

        const dados =
            localStorage.getItem(
                "arquivo"
            )

        if (dados) {

            this.bytes =
                JSON.parse(dados)

        }

    }


    /*
        Estrutura do registro:

        [LÁPIDE]
        [TAMANHO]
        [DADOS]
    */

    adicionarRegistro(dados) {

        const lapide = 0
        const tamanho = dados.length

        this.bytes.push(
            lapide,
            tamanho,
            ...dados
        )

        this.salvar()

    }


    /*
        Percorre o arquivo:

        lê cabeçalho
        extrai dados
        reconstrói Produto
    */

    listar() {

        const produtos = []

        let posicao = 0

        while (
            posicao <
            this.bytes.length
        ) {

            // Cabeçalho
            const lapide =
                this.bytes[posicao]

            const tamanho =
                this.bytes[
                    posicao + 1
                ]


            // Conteúdo do registro
            const dados =
                this.bytes.slice(
                    posicao + 2,
                    posicao + 2 + tamanho
                )


            // Só mostra registros ativos
            if (
                lapide === 0
            ) {

                produtos.push(

                    Produto
                        .desserializar(
                            dados
                        )

                )

            }


            // Vai para próximo registro
            posicao +=
                tamanho + 2

        }

        return produtos

    }

}