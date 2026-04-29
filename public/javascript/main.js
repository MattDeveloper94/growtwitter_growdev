function logout() {
    console.log("Logout automático, token expirado ou inválido!");
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const acao = item.dataset.page;

            if (acao === "home") {
                window.location.href = "home.html";
            } else if (acao === "explore") {
                window.location.href = "explore.html";
                // } else if (acao === "notifications") {
                //     window.location.href = "notifications.html";
                // } else if (acao === "profile") {
                //     window.location.href = "profile.html";
            }
        });
    });


    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const avatar = document.querySelector(".avatar-logado");
    const avatarTweetBox = document.querySelector(".avatar-tweet-box");

    if (usuarioLogado?.fotoPerfil) {

        avatar.innerHTML = `
            <img 
                src="http://localhost:3000${usuarioLogado.fotoPerfil}"
                class="avatar-img"
            >
        `;
    } else {

        const inicial = usuarioLogado.nome.charAt(0).toUpperCase();

        avatar.textContent = inicial;
        avatar.classList.add("avatar-placeholder");
    }

    if (usuarioLogado?.fotoPerfil) {

        avatarTweetBox.innerHTML = `
            <img 
                src="http://localhost:3000${usuarioLogado.fotoPerfil}"
                class="avatar-img"
            >
        `;
    } else {

        const inicial = usuarioLogado.nome.charAt(0).toUpperCase();

        avatarTweetBox.textContent = inicial;
        avatarTweetBox.classList.add("avatar-placeholder");
    }

    document.getElementById("btn-menu")?.addEventListener("click", logout);
});