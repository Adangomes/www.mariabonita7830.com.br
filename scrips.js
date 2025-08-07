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
