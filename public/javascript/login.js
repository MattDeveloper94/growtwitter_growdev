document.addEventListener('DOMContentLoaded', () => {
    // checando login e senha
    const form = document.getElementById("login-form");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            // validação |                     id do input no HTML
            const login = document.getElementById("login").value;
            const senha = document.getElementById("password").value;
            // validacao email ou username
            const dados = login.includes("@") ? { email: login, senha } : { username: login, senha };

            try {
                const resposta = await fetch("http://localhost:3000/api/auths", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(dados),

                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    alert(resultado.mensagem || resultado.message || "Erro ao fazer login.");
                    return;
                }

                localStorage.setItem("usuarioLogado", JSON.stringify(resultado.usuario));
                localStorage.setItem("token", resultado.token);
                window.location.href = "home.html";

            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com a API");
            }

        });
    }
});