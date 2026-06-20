class Visualizador {
  static desenhar(registros) {
    const areaArquivo = document.getElementById("area-arquivo");
    areaArquivo.innerHTML = "";

    if (registros.length === 0) {
      areaArquivo.innerHTML =
        "<p style='padding: 10px; color: #1e293b;'>O arquivo está vazio.</p>";
      return;
    }

    registros.forEach((registro) => {
      const produto = registro.produto || registro;
      const isExcluido = registro.lapide === 1;

      const bytes = produto.serializar();

      const tamanhoHex = bytes.length
        .toString(16)
        .toUpperCase()
        .padStart(2, "0");
      const lapideHex = isExcluido ? "01" : "00";
      const statusTexto = isExcluido ? "Excluído" : "Ativo";
      const classeExtra = isExcluido ? " destaque-excluir" : "";

      //separando dados
      const idBytes = bytes.slice(0, 4);

      const tamNomeBytes = bytes.slice(4, 6);
      const tamNome = ByteStream.readShort(new Int8Array(bytes), 4);

      const nomeBytes = bytes.slice(6, 6 + tamNome);

      const precoBytes = bytes.slice(6 + tamNome, 6 + tamNome + 4);

      const toHex = (arr) =>
        Array.from(arr)
          .map((b) => (b & 0xff).toString(16).toUpperCase().padStart(2, "0"))
          .join(" ");

      const htmlRegistro = `
  <div class="registro${classeExtra}" id="reg-${produto.id}" 
       onmouseenter=" inspecionar('-', '${statusTexto}', '${bytes.length}', '${produto.id}', '${produto.nome}', 'R$ ${produto.preco.toFixed(2)}')" 
       onmouseleave="limparInspecao()">
      
      <div class="campo lapide" 
           onmouseenter=" inspecionar('-', '${statusTexto}', '-', '-', '-', '-')" 
           onmouseleave="limparInspecao()">${lapideHex}</div>
      
      <div class="campo tamanho" 
           onmouseenter=" inspecionar('-', '-', '${bytes.length}', '-', '-', '-')" 
           onmouseleave="limparInspecao()">${tamanhoHex}</div>
      
      <div class="campo dados" 
           onmouseenter=" inspecionar('-', '-', '-', '${produto.id}', '-', '-')" 
           onmouseleave="limparInspecao()">${toHex(idBytes)}</div>
           
      <div class="campo dados"
           onmouseenter=" inspecionar('-', '-', '-', '-', 'Tamanho da String: ${tamNome}', '-')" 
           onmouseleave="limparInspecao()">${toHex(tamNomeBytes)}</div>
           
      <div class="campo dados" 
           onmouseenter=" inspecionar('-', '-', '-', '-', '${produto.nome}', '-')" 
           onmouseleave="limparInspecao()">${toHex(nomeBytes)}</div>
           
      <div class="campo dados" 
           onmouseenter=" inspecionar('-', '-', '-', '-', '-', 'R$ ${produto.preco.toFixed(2)}')" 
           onmouseleave="limparInspecao()">${toHex(precoBytes)}</div>
  </div>
`;
      areaArquivo.innerHTML += htmlRegistro;
    });
  }
}
