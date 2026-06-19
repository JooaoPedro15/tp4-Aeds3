class Arquivo {
  constructor() {
    // Representa o conteúdo do arquivo em bytes
    this.bytes = [];

    // Recupera os dados salvos anteriormente
    this.carregar();
  }

  // Salva o vetor de bytes no LocalStorage
  salvar() {
    localStorage.setItem("arquivo", JSON.stringify(this.bytes));
  }

  // Carrega o vetor salvo
  carregar() {
    const dados = localStorage.getItem("arquivo");

    if (dados) {
      this.bytes = JSON.parse(dados);
    }
  }

  /*
        Estrutura do registro:

        [LÁPIDE]
        [TAMANHO]
        [DADOS]
    */

  adicionarRegistro(dados) {
    const lapide = 0;
    const tamanho = dados.length;

    this.bytes.push(lapide, tamanho, ...dados);

    this.salvar();
  }

  /*
        Percorre o arquivo:

        lê cabeçalho
        extrai dados
        reconstrói Produto
    */

  listar() {
    const produtos = [];

    let posicao = 0;

    while (posicao < this.bytes.length) {
      // Cabeçalho
      const lapide = this.bytes[posicao];

      const tamanho = this.bytes[posicao + 1];

      // Conteúdo do registro
      const dados = this.bytes.slice(posicao + 2, posicao + 2 + tamanho);

      // Só mostra registros ativos
      if (lapide === 0) {
        produtos.push(Produto.desserializar(dados));
      }

      // Vai para próximo registro
      posicao += tamanho + 2;
    }

    return produtos;
  }

  /*
    Procura um registro pelo ID no vetor de bytes
    Retorna o objeto Produto se for encontrado e estiver ativo
     */
  buscar(id) {
    let posicao = 0;

    while (posicao < this.bytes.length) {
      const lapide = this.bytes[posicao];
      const tamanho = this.byte[posicao + 1];
      //pega dados que comecam de posicao + 2  ate o fim
      const dados = this.bytes.slice(posicao + 2, ...[posicao + 2 + tamanho]);

      if (lapide == 0) {
        const produto = Produto.desserializar(dados);
        if (produto.id === id) {
          return produto; //retorna se encontrado
        }
      }
      posicao += tamanho + 2;
    }
    return null; //caso nao seja encontrado
  }

  /*
    Exclusão lógica com lápide, procurando o registro
    e alterando o byte lápide para 1
     */
  excluir(id) {
    let posicao = 0;

    while (posicao < this.bytes.length) {
      const lapide = this.bytes[posicao];
      const tamanho = this.bytes[posicao + 1];
      const dados = this.bytes.slice(posicao + 2, ...[posicao + 2 + tamanho]);

      if (lapide === 0) {
        const produto = Produto.desserializar(dados);
        if (produto.id === id) {
          this.bytes[posicao] = 1; //altera a lapide para 1
          this.salvar(); //salva alteracao
          return true;
        }
      }
      posicao += tamanho + 2;
    }

    return false; //se nao achar ou se já estiver excluido
  }

  /*
  Alteração do registro
  */
  alterar(id, novoProduto) {
    let posicao = 0;

    while (posicao < this.bytes.length) {
      const lapide = this.bytes[posicao];
      const tamanho = this.bytes[posicao + 1];
      const dados = this.bytes.slice(posicao + 2, ...[posicao + 2 + tamanho]);

      if (lapide === 0) {
        const produto = Produto.desserializar(dados);
        if (produto.id === id) {
          this.bytes[posicao] = 1; //marca como excluido o registor antigo

          const novosBytes = novoProduto.serializar();
          this.adicionarRegistro(novosBytes); //salva
          return true;
        }
      }
      posicao += tamanho + 2;
    }

    return false; //se nao acha produto para alterar
  }
}
