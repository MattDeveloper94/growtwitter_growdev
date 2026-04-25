document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById("formCadastro");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            //capturando valores
            const nome = document.getElementById("name").value;
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("password").value;
            const dtNascimento = document.getElementById("birthdate").value;

            const dados = {
                nome,
                username,
                email,
                senha,
                dtNascimento
            };

            try {
                const resposta = await fetch("http://localhost:3000/api/users", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    alert(resultado.message || "Erro ao criar usuário");
                    return;
                }

                alert("Usuário criado com sucesso!");
                console.log(resultado);
                window.location.href = "index.html";

            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com a API");
            }
        });
    }
});