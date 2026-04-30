function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

function atualizarUsuarioLogadoNaTela(usuario) {
    document.querySelector(".user-name-logado").textContent = usuario.nome;
    document.querySelector(".user-username-logado").textContent = `@${usuario.username}`;

    document.querySelectorAll(".avatar-usuario-logado").forEach((avatar) => {
        avatar.innerHTML = usuario.fotoPerfil
            ? `<img src="http://localhost:3000${usuario.fotoPerfil}?t=${Date.now()}" class="avatar-img">`
            : usuario.nome.charAt(0).toUpperCase();
    });
}

async function carregarUsuarioLogadoDaApi() {
    const token = localStorage.getItem("token");

    if (!token) {
        logout();
        return;
    }

    const resposta = await fetch("http://localhost:3000/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (resposta.status === 401) {
        logout();
        return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok) {
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(resultado.usuario));

    atualizarUsuarioLogadoNaTela(resultado.usuario);
}

document.addEventListener("DOMContentLoaded", async () => {
    await carregarUsuarioLogadoDaApi();

    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", () => {
            const acao = item.dataset.page;

            if (acao === "home") {
                window.location.href = "home.html";
            } else if (acao === "explore") {
                window.location.href = "explore.html";
            }
        });
    });

    const profileBtn = document.querySelector(".user-account");
    const dropdown = document.querySelector(".profile-dropdown");

    profileBtn?.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown?.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".user-account")) {
            dropdown?.classList.remove("open");
        }
    });

    const modalFoto = document.getElementById("modalFoto");
    const btnUploadFoto = document.getElementById("btnUploadFoto");
    const btnEscolherFoto = document.getElementById("btnEscolherFoto");
    const btnFecharModal = document.getElementById("btnFecharModal");
    const inputFoto = document.getElementById("inputFoto");
    const btnFotoTweet = document.getElementById("btnFotoTweet");
    const inputFotoTweet = document.getElementById("inputFotoTweet");
    const previewFotoTweet = document.getElementById("previewFotoTweet");

    btnUploadFoto?.addEventListener("click", (event) => {
        event.stopPropagation();
        modalFoto?.classList.add("open");
    });

    btnFecharModal?.addEventListener("click", () => {
        modalFoto?.classList.remove("open");
    });

    btnEscolherFoto?.addEventListener("click", () => {
        inputFoto.value = "";
        inputFoto.click();
    });

    btnFotoTweet?.addEventListener("click", () => {
        inputFotoTweet.value = "";
        inputFotoTweet.click();
    });

    inputFotoTweet?.addEventListener("change", () => {
        const arquivo = inputFotoTweet.files[0];

        if (!arquivo) {
            previewFotoTweet.innerHTML = "";
            return;
        }

        const url = URL.createObjectURL(arquivo);

        previewFotoTweet.innerHTML = `
        <img src="${url}" class="preview-tweet-image">
    `;
    });

    modalFoto?.addEventListener("click", (event) => {
        if (event.target === modalFoto) {
            modalFoto.classList.remove("open");
        }
    });

    inputFoto?.addEventListener("change", async () => {
        const arquivo = inputFoto.files[0];
        if (!arquivo) return;

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("fotoPerfil", arquivo);

        const resposta = await fetch("http://localhost:3000/api/users/foto", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (resposta.status === 401) {
            logout();
            return;
        }

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.message || "Erro ao alterar foto");
            return;
        }

        await carregarUsuarioLogadoDaApi();

        modalFoto?.classList.remove("open");
        inputFoto.value = "";
    });

    document.getElementById("btn-menu")?.addEventListener("click", logout);
    document.getElementById("btnLogout")?.addEventListener("click", logout);
});