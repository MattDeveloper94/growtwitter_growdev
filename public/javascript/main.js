document.addEventListener("DOMContentLoaded", () => {

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    }


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

    document.getElementById("btn-menu")?.addEventListener("click", logout);
});