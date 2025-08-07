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

const carrinho = [];

function adicionarAoCarrinho(nome, codigo, preco) {
  carrinho.push({ nome, codigo, preco });
  alert(`${nome} adicionado ao carrinho!`);
}

function mostrarCarrinho() {
  const container = document.getElementById("carrinho-container");
  const lista = document.getElementById("lista-carrinho");

  lista.innerHTML = ""; // Limpa carrinho antes de mostrar

  carrinho.forEach((item, index) => {
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
  carrinho.forEach((item) => {
    mensagem += `• ${item.nome} (cod: ${item
