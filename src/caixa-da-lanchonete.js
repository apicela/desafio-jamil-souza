class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };

    this.formasDePagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(formaPagamento, itens) {
    if (!this.formasDePagamento.includes(formaPagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    let hasCafe = false;
    let hasSanduiche = false;

    for (const lanche of itens) {
      const [codigo, quantidade] = lanche.split(",");

      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      if (quantidade == 0) {
        return "Quantidade inválida!";
      }

      // checar condiçoes de item principal
      if (codigo === "cafe") {
        hasCafe = true;
      }

      if (codigo === "sanduiche") {
        hasSanduiche = true;
      }

      if (
        (codigo === "queijo" && !hasSanduiche) ||
        (codigo === "chantily" && !hasCafe)
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }
      const valorItem = this.cardapio[codigo].valor;
      total += valorItem * quantidade;
    }

    // calcula valor total de acordo com tipo de pagamento
    if (formaPagamento === "dinheiro") {
      total *= 0.95;
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    } else if (formaPagamento === "credito") {
      total *= 1.03;
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    } else {
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
  }
}

export { CaixaDaLanchonete };
