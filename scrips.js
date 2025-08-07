// Login
function fazerLogin() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (usuario === "mariabonita" && senha === "91453710") {
    localStorage.setItem("logado", "true");
    mostrarPagina();
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

  // Reexibe conteúdo se usuário já estiver logado
  if (localStorage.getItem("logado") === "true") {
    mostrarPagina();
  }

  // Abre/fecha o menu mobile
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Fecha o menu ao clicar em "Fechar"
  fecharBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Carrinho
const carrinho = [];

function adicionarAoCarrinho(nome, codigo) {
  carrinho.push({ nome, codigo });
  alert(`${nome} adicionado ao carrinho!`);
}

function mostrarCarrinho() {
  const container = document.getElementById("carrinho-container");
  const lista = document.getElementById("lista-carrinho");

  lista.innerHTML = ""; // Limpa carrinho antes de mostrar

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} (cod: ${item.codigo})`;
    lista.appendChild(li);
  });

  container.style.display = "block";
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Tenho interesse nos seguintes produtos:%0A";
  carrinho.forEach((item) => {
    mensagem += `• ${item.nome} (cod: ${item.codigo})%0A`;
  });

  const numeroWhatsApp = "554789257740"; // seu número com DDI + DDD
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, "_blank");
}

// Clique no carrinho mostra os itens
document.querySelector(".cart").addEventListener("click", mostrarCarrinho);
