// =============================
// ESTADO GLOBAL DO CARRINHO
// =============================
const carrinho = [];

// =============================
// SABORES
// =============================
const SABORES_SALGADOS = [
    "Frango Catupiry", "Calabresa", "Toscana", "Bacon", "Kartoffel",
    "Portuguesa", "Bacon com Milho", "Marguerita", "Calabresa Acebolada",
    "Pizza de fritas cheddar e Bacon", "Napolitana", "Milho"
];

const SABORES_DOCES = [
    "Prestígio", "Chocolate com Morango", "Banana Nevada", "Charge",
    "Confete", "Chocolate Preto", "Chocolate Branco", "Dois Amores"
];

const TODOS_SABORES = [...SABORES_SALGADOS, ...SABORES_DOCES];
const PRECO_PIZZA_DOCE_M = 25.00;

// =============================
// BEBIDAS
// =============================
const BEBIDAS = [
    { nome: "Guaraná (600ml)", preco: 0 },
    { nome: "Coca Cola 1,5L", preco: 15.00 },
    { nome: "Kuat 2L", preco: 15.00 },
    { nome: "Coca Cola Lata", preco: 6.00 },
    { nome: "Guaraná Lata", preco: 6.00 }
];

// =============================
// BAIRROS POR CIDADE
// =============================
const bairrosJaragua = [
    "Centro", "Amizade", "Baependi", "Barra do Rio Cerro", "Boa Vista",
    "Czerniewicz", "Ilha da Figueira", "Jaraguá 84", "Jaraguá Esquerdo", "João Pessoa",
    "Nova Brasília", "Nereu Ramos", "Rau", "Rio Cerro I", "Rio Cerro II",
    "Rio da Luz", "Tifa Martins", "Três Rios do Sul", "Vieira", "Vila Lenzi"
];

const bairrosGuaramirim = [
    "Centro", "Amizade", "Avaí", "Bananal do Sul", "Corticeira",
    "Figueirinha", "Guamiranga", "Imigrantes", "João Pessoa", "Nova Esperança",
    "Recanto Feliz", "Rio Branco", "Rua Nova", "Seleção", "Escolinha"
];

// =============================
// ADICIONAR PRODUTO
// =============================
function adicionarAoCarrinho(nome, codigo, preco) {
    // P027: Pizza Meio a Meio
    if (codigo === "P027") {
        let sabor1 = prompt("Escolha o primeiro sabor:\n" + TODOS_SABORES.join(", "));
        let sabor2 = prompt("Escolha o segundo sabor:\n" + TODOS_SABORES.join(", "));
        if (!sabor1 || !sabor2) return alert("Você precisa escolher 2 sabores!");
        nome += ` (${sabor1} + ${sabor2})`;
    }

    // P026: Pizza G (3 sabores)
    else if (codigo === "P026") {
        let sabor1 = prompt("Escolha o primeiro sabor:\n" + TODOS_SABORES.join(", "));
        let sabor2 = prompt("Escolha o segundo sabor:\n" + TODOS_SABORES.join(", "));
        let sabor3 = prompt("Escolha o terceiro sabor:\n" + TODOS_SABORES.join(", "));
        if (!sabor1 || !sabor2 || !sabor3) return alert("Você precisa escolher 3 sabores!");
        nome += ` (${sabor1} + ${sabor2} + ${sabor3})`;
    }

    // P029: Pizza M Doce (1 sabor)
    else if (codigo === "P029") {
        let sabor = prompt("Escolha o sabor da pizza doce:\n" + SABORES_DOCES.join(", "));
        if (!sabor) return alert("Você precisa escolher 1 sabor!");
        nome += ` (${sabor})`;
        preco = PRECO_PIZZA_DOCE_M; // número
    }

    // P025: Combo 2 Pizzas + Bebida
    else if (codigo === "P025") {
        let sabor1 = prompt("Escolha o primeiro sabor:\n" + TODOS_SABORES.join(", "));
        let sabor2 = prompt("Escolha o segundo sabor:\n" + TODOS_SABORES.join(", "));
        if (!sabor1 || !sabor2) return alert("Você precisa escolher 2 sabores!");

        let bebidaOpcoes = BEBIDAS.map((b, i) =>
            `${i + 1} - ${b.nome} ${b.preco > 0 ? "(+R$" + b.preco.toFixed(2) + ")" : "Grátis"}`
        ).join("\n");

        let bebidaEscolha = prompt("Escolha a bebida DIGITANDO UM NÚMERO:\n\n" + bebidaOpcoes);
        let bebidaIndex = parseInt(bebidaEscolha) - 1;
        if (isNaN(bebidaIndex) || !BEBIDAS[bebidaIndex]) return alert("Bebida inválida!");

        let bebida = BEBIDAS[bebidaIndex];
        nome += ` (${sabor1} + ${sabor2}) + ${bebida.nome}`;
        preco = Number(preco) + bebida.preco; // número
    }

    // PRODUTOS NORMAIS
    const precoNum = Number(preco);
    const itemExistente = carrinho.find(i => i.codigo === codigo && i.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, codigo, preco: precoNum, quantidade: 1 });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

// =============================
// ATUALIZAR CARRINHO + SALVAR
// =============================
function atualizarCarrinho() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    let subtotal = 0;
    carrinho.forEach((item, index) => {
        subtotal += Number(item.preco) * item.quantidade;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
      <div class="cart-item-name">${item.nome}</div>
      <div class="cart-item-actions">
        Qtd: ${item.quantidade}
        <button onclick="removerItem(${index})">Excluir</button>
      </div>`;
        container.appendChild(div);
    });

    document.getElementById("subtotal").innerText = `Subtotal: R$${subtotal.toFixed(2).replace(".", ",")}`;
    document.getElementById("total").innerText = `Total: R$${subtotal.toFixed(2).replace(".", ",")}`;

    localStorage.setItem("meuCarrinho", JSON.stringify(carrinho));
}

// =============================
// FINALIZAR ENTREGA (Etapa 2)
// =============================
function finalizarEntrega() {
    if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

    const nome = document.getElementById("nomeCliente").value;
    const cidade = document.getElementById("cidade").value;
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const referencia = document.getElementById("referencia").value;
    const observacao = document.getElementById("observacao").value;
    const pagamento = document.getElementById("pagamento").value;
    const troco = document.getElementById("troco").value;

    if (!nome || !cidade || !bairro || !rua || !numero || !pagamento) {
        return alert("Preencha todos os campos obrigatórios!");
    }

    let taxaEntrega = calcularTaxaEntrega(cidade, bairro);
    let taxaFormatada = taxaEntrega > 0 ? `R$${taxaEntrega},00` : "Grátis";

    // Itens em negrito
    let itensMsg = carrinho.map(item =>
        `• *${item.nome}* - R$${Number(item.preco).toFixed(2).replace(".", ",")} x ${item.quantidade}`
    ).join("\n");

    let mensagem =
`Novo pedido recebido:

${itensMsg}

Cliente: *${nome}*
Cidade: *${cidade.toUpperCase()}*
Bairro: *${bairro}*
Endereço: Rua ${rua}, Nº ${numero}
Ref: ${referencia || "-"}
Obs: ${observacao || "-"}

Pagamento: *${pagamento}${pagamento === "Dinheiro" && troco ? " (troco para R$" + troco + ")" : ""}*
Taxa de entrega: ${taxaFormatada}
Tempo de entrega: 30 a 45 minutos`;

    const numeroWhatsApp = "5547992641324";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}
// SPLASH SCREEN
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => {
      splash.classList.add("hide");
      setTimeout(() => splash.style.display = "none", 500);
    }, 1500); // 1.5s
  }
});
