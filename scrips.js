// === LOGIN ===
function fazerLogin() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!usuario || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    // Simples login local
    if (usuario === "mariabonita" && senha === "91453710") {
        localStorage.setItem("logado", "true");
        mostrarPagina();
    } else {
        document.getElementById("erro").style.display = "block";
    }
}

// === MOSTRAR CONTEÚDO PÓS-LOGIN ===
function mostrarPagina() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

// === MENU MOBILE ===
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const fecharBtn = document.getElementById("fecharButton");

    // Se já estiver logado, mostra a página
    if (localStorage.getItem("logado") === "true") {
        mostrarPagina();
    }

    // Abre/fecha o menu mobile
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

    // Fecha o menu ao clicar em "Fechar"
    if (fecharBtn && mobileMenu) {
        fecharBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    }
});

// === LOGOUT (caso use futuramente) ===
function logout() {
    localStorage.removeItem("logado");
    location.reload();
}
document.getElementById("feedback-msg").style.display = "block";
setTimeout(() => {
  document.getElementById("feedback-msg").style.display = "none";
}, 2000);
let produtoSelecionado = {};

function abrirModal(nome, codigo, preco, imagens = []) {
  produtoSelecionado = { nome, codigo, preco, imagens };

  document.getElementById("modal-nome").textContent = nome;
  document.getElementById("modal-codigo").textContent = `Código: ${codigo}`;
  document.getElementById("modal-preco").textContent = `Preço: ${preco}`;

  // Simula estoque (pode ser dinâmico futuramente)
  document.getElementById("estoque-quantidade").textContent = 5;

  // Galeria de imagens
  const galeria = document.getElementById("modal-fotos");
  galeria.innerHTML = "";
  imagens.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    galeria.appendChild(img);
  });

  document.getElementById("produto-modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("produto-modal").style.display = "none";
}

function confirmarAdicao() {
  const tamanho = document.getElementById("tamanho").value;
  const cor = document.getElementById("cor").value;
  const mensagem = document.getElementById("mensagem").value;

  const item = {
    ...produtoSelecionado,
    tamanho,
    cor,
    mensagem
  };

  carrinho.push(item);
  fecharModal();

  // Feedback visual
  const msg = document.getElementById("feedback-msg");
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 2000);
}


