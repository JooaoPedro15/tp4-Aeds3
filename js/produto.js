class Produto {

    /*
        Representa um produto armazenado no arquivo.

        Cada produto possui:
        - id → identificador único
        - nome → nome do produto
        - preco → valor do produto
    */

    constructor(id, nome, preco) {

        this.id = id
        this.nome = nome
        this.preco = preco

    }


    /*
        Converte o objeto Produto em bytes.

        Processo:

        Produto
        ↓
        "1|Notebook|4500"
        ↓
        [49,124,78,111,...]

        O caractere "|" separa os campos para
        permitir reconstruir o objeto depois.
    */

    serializar() {

        const texto =
            `${this.id}|${this.nome}|${this.preco}`


        return Conversor
            .textoParaBytes(
                texto
            )

    }


    /*
        Reconstrói um Produto a partir dos bytes.

        Processo:

        [49,124,78,...]
        ↓
        "1|Notebook|4500"
        ↓
        split("|")
        ↓
        Produto
    */

    static desserializar(bytes) {

        const texto =
            Conversor
                .bytesParaTexto(
                    bytes
                )


        // Divide o texto em campos
        const [
            id,
            nome,
            preco
        ] =
        texto.split("|")


        // Cria novamente o objeto
        return new Produto(
            Number(id),
            nome,
            Number(preco)
        )

    }

}