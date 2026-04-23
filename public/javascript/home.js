async function carregarTweets() {
    try {
        const resposta = await fetch("http://localhost:3000/api/tweets");
        const dado = await resposta.json();
        const feedList = document.getElementById("feedList");

        //limpar texto do feedlist>post-text
        feedList.innerHTML = "";

        dado.tweets.forEach((tweets) => {
            const article = document.createElement("article");
            article.classList.add("post");

            article.innerHTML = `
                <div class="avatar"></div>
                <div class="post-content">
                    <div class="post-header">
                        <b>${tweets.usuario.nome} @${tweets.usuario.username}</b> <span>• ${new Date(tweets.dtCriacao).toLocaleString()}</span>
                    </div>
                    <div class="post-text">
                        ${tweets.conteudo}
                    </div>
                    <div class="post-footer">   
                        <button class="icon-button">💬</button>
                        <button class="icon-button">🔄</button>
                        <button class="icon-button">❤️</button>
                        <button class="icon-button btn-editar" dado-id="${tweets.id}" dado-conteudo="${tweets.conteudo}">✏️</button>
                        <button class="icon-button btn-deletar" dado-id="${tweets.id}">🗑️</button>
                    </div>
                </div>
            `;

            feedList.appendChild(article);

            const btnEditar = article.querySelector(".btn-editar");
            const btnDeletar = article.querySelector(".btn-deletar");

            btnEditar.addEventListener("click", async () => {
                const novoConteudo = prompt("Editar tweet:", tweets.conteudo);

                if (!novoConteudo || !novoConteudo.trim()) {
                    return;
                }

                try {
                    const resposta = await fetch(`http://localhost:3000/api/tweets/${tweets.id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            conteudo: novoConteudo
                        })
                    });

                    const resultado = await resposta.json();

                    if (!resposta.ok) {
                        alert(resultado.message || "Erro ao editar tweet");
                        return;
                    }
                    carregarTweets();

                } catch (error) {
                    console.error(error);
                    alert("Erro ao conectar com a API");
                }
            });

            btnDeletar.addEventListener("click", async () => {
                try {
                    const resposta = await fetch(`http://localhost:3000/api/tweets/${tweets.id}`, {
                        method: 'DELETE'
                    });

                    const resultado = await resposta.json();

                    if (!resposta.ok) {
                        alert(resultado.message || "Erro ao deletar tweet");
                        return;
                    }
                    carregarTweets();

                } catch (error) {
                    console.error(error);
                    alert("Erro ao conectar com a API");
                }
            });
        });

        if (dado.tweets.length === 0) {
            feedList.innerHTML = `
        <p style="color: #888; text-align: center; margin-top: 20px;">
            Nenhum tweet ainda... <img src="../../public/img/imagem_logo.svg" style="width: 30px; opacity: 0.6;" />
        </p>
            `;
            return;
        }

    } catch (error) {
        console.error(error);
    }
}

// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    carregarTweets();
    const btnPostar = document.getElementById("btnPostar");

    if (btnPostar) {
        btnPostar.addEventListener("click", async function () {

            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

            if (!usuarioLogado) {
                alert("Usuário não está logado.");
                return;
            }

            const tweet = document.getElementById("tweetContent").value;

            try {
                const resposta = await fetch("http://localhost:3000/api/tweets", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        conteudo: tweet,
                        userId: usuarioLogado.id
                    })
                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    alert(resultado.mensagem || "Erro ao criar seu post");
                    return;
                }

                document.getElementById("tweetContent").value = "";
                carregarTweets();

            } catch (error) {
                console.error(error);
                alert("Erro ao conectar com a API");
            }
        });
    }


    // --- verifica se o campo search ta em foco ---
    const busca = document.getElementById('searchField');
    if (busca) {
        busca.addEventListener('blur', () => {
            busca.value = ''; // Limpa ao clicar fora
        });
    }
});
