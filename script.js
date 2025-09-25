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
    { nome: "Laranjinha (600ml)", preco: 0 },
    { nome: "Coca Cola 2L", preco: 18.00 },
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

    // P026: Pizza G (3 sabores, sem bebida)
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
        preco = "R$" + PRECO_PIZZA_DOCE_M.toFixed(2);
    }

    // P025: Combo 2 Pizzas + Bebida
    else if (codigo === "P025") {
        let sabor1 = prompt("Escolha o primeiro sabor:\n" + TODOS_SABORES.join(", "));
        let sabor2 = prompt("Escolha o segundo sabor:\n" + TODOS_SABORES.join(", "));
        if (!sabor1 || !sabor2) return alert("Você precisa escolher 2 sabores!");

        let bebidaOpcoes = BEBIDAS.map((b, i) =>
            `${i + 1} - ${b.nome} ${b.preco > 0 ? "(+R$" + b.preco.toFixed(2) + ")" : ""}`
        ).join("\n");
        let bebidaEscolha = prompt("Escolha a bebida:\n" + bebidaOpcoes);
        let bebidaIndex = parseInt(bebidaEscolha) - 1;
        if (isNaN(bebidaIndex) || !BEBIDAS[bebidaIndex]) return alert("Bebida inválida!");

        let bebida = BEBIDAS[bebidaIndex];
        nome += ` (${sabor1} + ${sabor2}) + ${bebida.nome}`;
        preco = "R$" + (parseFloat(preco.replace("R$", "").replace(",", ".")) + bebida.preco).toFixed(2);
    }

    // PRODUTOS NORMAIS
    const itemExistente = carrinho.find(i => i.codigo === codigo && i.nome === nome);
    if (itemExistente) itemExistente.quantidade += 1;
    else carrinho.push({ nome, codigo, preco, quantidade: 1 });

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
        const precoNum = parseFloat(item.preco.toString().replace("R$", "").replace(",", "."));
        subtotal += precoNum * item.quantidade;

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
// CONTROLES DO CARRINHO
// =============================
function abrirCarrinho() { document.getElementById("cart-modal").style.display = "flex"; }

function fecharCarrinho() { document.getElementById("cart-modal").style.display = "none"; }

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho.length = 0;
    localStorage.removeItem("meuCarrinho");
    atualizarCarrinho();
}

// =============================
// MODAL DE ENTREGA
// =============================
function abrirDelivery() {
    fecharCarrinho();
    document.getElementById("delivery-modal").style.display = "flex";
}

function fecharDelivery() { document.getElementById("delivery-modal").style.display = "none"; }

function carregarBairros() {
    const cidade = document.getElementById("cidade").value;
    const bairroSelect = document.getElementById("bairro");
    bairroSelect.innerHTML = "";
    let lista = [];
    if (cidade === "jaragua") lista = bairrosJaragua;
    if (cidade === "guaramirim") lista = bairrosGuaramirim;
    lista.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b;
        opt.textContent = b;
        bairroSelect.appendChild(opt);
    });
}

function toggleTroco() {
    const pagamento = document.getElementById("pagamento").value;
    document.getElementById("troco-box").style.display = (pagamento === "Dinheiro") ? "block" : "none";
}

// =============================
// CALCULAR TAXA DE ENTREGA
// =============================
function calcularTaxaEntrega(cidade, bairro) {
    let taxa = 0;

    if (cidade === "jaragua") {
        taxa = 20; // todos os bairros de Jaraguá
    } else if (cidade === "guaramirim") {
        if (bairro === "Centro") taxa = 10;
        else if (bairro === "Escolinha") taxa = 5;
        else taxa = 15; // demais bairros de Guaramirim
    }

    return taxa;
}

// =============================
// ETAPA 1 → ETAPA 2 (Resumo)
// =============================
function mostrarResumo() {
    const nome = document.getElementById("nomeCliente").value;
    const cidade = document.getElementById("cidade").value;
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const pagamento = document.getElementById("pagamento").value;

    if (!nome || !cidade || !bairro || !rua || !numero || !pagamento) {
        return alert("Preencha todos os campos obrigatórios antes de continuar!");
    }

    let subtotal = 0;
    carrinho.forEach(item => {
        subtotal += parseFloat(item.preco.replace("R$", "").replace(",", ".")) * item.quantidade;
    });

    let taxaEntrega = calcularTaxaEntrega(cidade, bairro);

    const resumoItens = document.getElementById("resumo-itens");
    resumoItens.innerHTML = "";
    carrinho.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.quantidade}x ${item.nome} - ${item.preco}`;
        resumoItens.appendChild(div);
    });

    document.getElementById("resumo-taxa").innerText = `🚚 Taxa de entrega: R$${taxaEntrega},00`;
    document.getElementById("resumo-total").innerText = `💰 Total: R$${(subtotal + taxaEntrega).toFixed(2).replace(".", ",")}`;

    document.getElementById("step1-buttons").style.display = "none";
    document.getElementById("resumo-pedido").style.display = "block";
}

function voltarFormulario() {
    document.getElementById("resumo-pedido").style.display = "none";
    document.getElementById("step1-buttons").style.display = "block";
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
        return alert("Preencha todos os campos obrigatórios (nome, endereço e pagamento)!");
    }

    let taxaEntrega = calcularTaxaEntrega(cidade, bairro);

    let resumo = `👤 Cliente: ${nome}\n📍 *Entrega em ${cidade.toUpperCase()}*\nBairro: ${bairro}\nRua: ${rua}, Nº ${numero}\nRef: ${referencia}\nObs: ${observacao}\n`;
    resumo += `💳 Pagamento: ${pagamento}`;
    if (pagamento === "Dinheiro" && troco) resumo += ` (troco para R$${troco})`;
    resumo += `\n🚚 Taxa de entrega: R$${taxaEntrega},00\n⏰ Tempo de entrega: 30 a 45 minutos\n`;

    let mensagem = "🍕 Olá! Gostaria de fazer meu pedido:%0A";
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} (cod: ${item.codigo}) - ${item.preco} x ${item.quantidade}%0A`;
    });

    mensagem += `%0A${resumo}`;

    const numeroWhatsApp = "5547992641324";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

// =============================
// AO CARREGAR A PÁGINA
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const salvo = localStorage.getItem("meuCarrinho");
    if (salvo) {
        carrinho.push(...JSON.parse(salvo));
        atualizarCarrinho();
    }
    const cartIcon = document.querySelector(".cart");
    if (cartIcon) cartIcon.addEventListener("click", abrirCarrinho);
});

