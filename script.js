// Login
function fazerLogin() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  if (usuario === "mariabonita" && senha === "91453710") {
    localStorage.setItem("logado", "true");
    mostrarPagina();
    document.getElementById("erro").style.display = "none";
  } else {
    document.getElementById("erro").style.display = "block";
  }
}

function mostrarPagina() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const fecharBtn = document.getElementById("fecharButton");

  if (localStorage.getItem("logado") === "true") mostrarPagina();

  hamburger.addEventListener("click", () => mobileMenu.classList.toggle("active"));
  fecharBtn.addEventListener("click", () => mobileMenu.classList.remove("active"));
  document.querySelector(".cart").addEventListener("click", mostrarCarrinho);
});

// Carrinho
const carrinho = [];

function adicionarAoCarrinho(nome, codigo, preco) {
  const itemExistente = carrinho.find(item => item.codigo === codigo);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, codigo, preco, quantidade: 1 });
  }
  alert(`${nome} adicionado ao carrinho!`);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let subtotal = 0;
  carrinho.forEach((item, index) => {
    const precoNum = parseFloat(item.preco.replace("R$", "").replace(",", "."));
    const totalItem = precoNum * item.quantidade;
    subtotal += totalItem;
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <span>${item.nome} (cod: ${item.codigo}) - ${item.preco} x ${item.quantidade}</span>
      <button onclick="removerItem(${index})">Excluir</button>
    `;
    lista.appendChild(li);
  });
  document.getElementById("subtotal").textContent = `Subtotal: R$${subtotal.toFixed(2).replace(".", ",")}`;
  document.getElementById("desconto").textContent = `Desconto: R$0,00`;
  document.getElementById("total").textContent = `Total: R$${subtotal.toFixed(2).replace(".", ",")}`;
}

function mostrarCarrinho() {
  atualizarCarrinho();
  document.getElementById("carrinho-container").style.display = "block";
}

function fecharCarrinho() {
  document.getElementById("carrinho-container").style.display = "none";
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
  const numeroWhatsApp = "554789257740";
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, "_blank");
}
