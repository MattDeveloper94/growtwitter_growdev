// capturando click e levando pra page home
document.addEventListener('DOMContentLoaded', () => {

    // checando login e senha
    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // validação aqui

            window.location.href = "home.html";
        });
    }

});