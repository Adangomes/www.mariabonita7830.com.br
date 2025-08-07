// Função para login
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

// Função para mostrar a página após login
function mostrarPagina() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

// Verifica se o usuário está logado ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("logado") === "true") {
    mostrarPagina();
  }

  // Menu hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const fecharBtn = document.getElementById("fecharButton");
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
  fecharBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Abrir carrinho ao clicar no ícone
  document.querySelector(".cart").addEventListener("click", mostrarCarrinho);
});

// Carrinho de compras
const carrinho = [];

function adicionarAoCarrinho(nome, codigo, preco) {
  carrinho.push({ nome, codigo, preco });
  alert(`${nome} adicionado ao carrinho!`);
}

function mostrarCarrinho() {
  const container = document.getElementById("carrinho-container");
  const lista = document.getElementById("lista-carrinho");

  lista.innerHTML = ""; // limpa antes

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} (cod: ${item.codigo}) - ${item.preco}`;
    lista.appendChild(li);
  });

  container.style.display = "block";
}

function fecharCarrinho() {
  document.getElementById("carrinho-container").style.display = "none";
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Tenho interesse nos seguintes produtos:%0A";
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} (cod: ${item.codigo}) - ${item.preco}%0A`;
  });

  const numeroWhatsApp = "554789257740"; // seu número com DDI + DDD
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, "_blank");
}
