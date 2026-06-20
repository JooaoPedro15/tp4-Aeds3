class Produto {
  constructor(id, nome, preco) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  /*
    converte o objeto em bytes
  */
  serializar() {
    const idBytes = ByteStream.writeInt(this.id);
    const nomeBytes = ByteStream.writeString(this.nome);
    const precoBytes = ByteStream.writeFloat(this.preco);

    return [
      ...Array.from(idBytes),
      ...Array.from(nomeBytes),
      ...Array.from(precoBytes),
    ];
  }

  /*
    reconstroi um Produto a partir dos bytes
  */
  static desserializar(dados) {
    const int8Dados = new Int8Array(dados);
    let offset = 0;

    const id = ByteStream.readInt(int8Dados, offset);
    offset += 4;

    const nome = ByteStream.readString(int8Dados, offset);

    const tamNomeBytes = ByteStream.readShort(int8Dados, offset);
    offset += 2 + tamNomeBytes; // avanca os 2 bytes do cabeçalho + as letras da string

    const preco = ByteStream.readFloat(int8Dados, offset);

    return new Produto(id, nome, preco);
  }
}
