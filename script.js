
// CARRINHO DINÂMICO
const carrinho = [];

function adicionarAoCarrinho(nome, codigo, preco) {
    const itemExistente = carrinho.find(i => i.codigo === codigo);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, codigo, preco, quantidade: 1 });
    }
    atualizarCarrinho();
    mostrarCarrinho();
}

function atualizarCarrinho() {
    const container = document.getElementById("cart-container");
    container.innerHTML = `
        <div class="cart-header">
            <h2>Meu Carrinho</h2>
            <button class="close-btn" onclick="fecharCarrinho()">X</button>
        </div>
    `;

    let subtotal = 0;

    carrinho.forEach((item, index) => {
        const precoNum = parseFloat(item.preco.replace("R$", "").replace(",", "."));
        subtotal += precoNum * item.quantidade;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div class="cart-item-name">${item.nome}</div>
            <div class="cart-item-actions">
                Qtd: ${item.quantidade}
                <button onclick="removerItem(${index})">Excluir</button>
            </div>
        `;
        container.appendChild(div);
    });

    const summary = document.createElement("div");
    summary.classList.add("summary");
    summary.innerHTML = `
        <p id="subtotal">Subtotal: R$${subtotal.toFixed(2).replace(".", ",")}</p>
        <p id="desconto">Desconto: R$0,00</p>
        <p><strong id="total">Total: R$${subtotal.toFixed(2).replace(".", ",")}</strong></p>
    `;
    container.appendChild(summary);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    buttonsDiv.innerHTML = `
        <button class="continue-btn" onclick="fecharCarrinho()">Continuar comprando</button>
        <button class="checkout-btn" onclick="finalizarCompra()">Finalizar compra</button>
    `;
    container.appendChild(buttonsDiv);
}

function mostrarCarrinho() {
    document.getElementById("cart-container").style.display = "block";
}

function fecharCarrinho() {
    document.getElementById("cart-container").style.display = "none";
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Tenho interesse nos seguintes produtos:%0A";
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} (cod: ${item.codigo}) - ${item.preco} x ${item.quantidade}%0A`;
    });

    const numeroWhatsApp = "5547984196636"; // seu número
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, "_blank");
}


