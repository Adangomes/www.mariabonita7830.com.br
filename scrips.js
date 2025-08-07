// === MENU MOBILE RESPONSIVO ===
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('show'); // Mostra/oculta o menu no mobile
        });
    }
});

// === Função para fechar o menu mobile (botão "fechar")
function fecharMenu() {
    const mobileMenu = document.getElementById("mobile-menu");

    // Remove tanto "show" quanto "active" se estiverem aplicadas
    mobileMenu.classList.remove("show");
    mobileMenu.classList.remove("active");
}

// === LOGIN ===
function fazerLogin() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;

    if (!usuario || !senha) {
        alert("Preencha todos os campos.");
        return false;
    }

    fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`
    })
        .then(res => res.text())
        .then(res => {
            if (res === "ok") {
                window.location.href = "painel.html";
            } else {
                document.getElementById("erro").style.display = "block";
            }
        });

    return false;
}

// === REDIRECIONAMENTO ===
function abrirCadastro() {
    window.location.href = "cadastro.html";
}

function abrirRecuperarSenha() {
    window.location.href = "recuperar.html";
}

// === VALIDAÇÃO DE CADASTRO ===
function validarCadastro() {
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const confTelefone = document.getElementById("confTelefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const confEmail = document.getElementById("confEmail").value.trim();
    const senha = document.getElementById("senha").value;
    const confSenha = document.getElementById("confSenha").value;

    if (!nome || !telefone || !confTelefone || !email || !confEmail || !senha || !confSenha) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (telefone !== confTelefone) {
        alert("Os telefones não coincidem.");
        return false;
    }

    if (!/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(telefone)) {
        alert("Telefone inválido. Use o formato (47) 91234-5678.");
        return false;
    }

    if (email !== confEmail) {
        alert("Os e-mails não coincidem.");
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("E-mail inválido.");
        return false;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return false;
    }

    if (senha !== confSenha) {
        alert("As senhas não coincidem.");
        return false;
    }

    alert("Cadastro validado com sucesso!");
    return true;
}

// === VALIDAÇÃO DE RECUPERAÇÃO DE SENHA ===
function recuperarSenha() {
    const email = document.getElementById("emailRecuperacao").value.trim();

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Digite um e-mail válido.");
        return false;
    }

    alert("Um código de recuperação foi enviado para seu e-mail.");
    return true;
}

// === LOGOUT ===
function logout() {
    // Fecha o menu caso esteja aberto
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.classList.contains("show") || mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("show");
        mobileMenu.classList.remove("active");
    }

    localStorage.removeItem("logado");
    location.reload();
}
