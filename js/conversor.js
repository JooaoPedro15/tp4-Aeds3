class Conversor {

    // Texto → bytes
    static textoParaBytes(texto) {

        return Array.from(
            new TextEncoder()
                .encode(texto)
        )

    }


    // Bytes → texto
    static bytesParaTexto(bytes) {

        return new TextDecoder()
            .decode(
                new Uint8Array(bytes)
            )

    }

}