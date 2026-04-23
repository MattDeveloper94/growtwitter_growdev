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
                        <button class="icon-button">🗑️</button>
                    </div>
                </div>
            `;

            feedList.appendChild(article);
        });

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

                alert("Tweet criado com sucesso!");
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
