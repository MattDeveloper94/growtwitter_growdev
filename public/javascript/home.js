async function carregarTweets() {
    try {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        const resposta = await fetch("http://localhost:3000/api/feed", {
            headers: {
                userId: usuarioLogado.id
            }
        });

        const dado = await resposta.json();
        const feedList = document.getElementById("feedList");

        //limpar texto do feedlist>post-text
        feedList.innerHTML = "";

        dado.tweets.forEach((tweets) => {
            const isOwner = tweets.userId === usuarioLogado.id;
            const article = document.createElement("article");
            article.classList.add("post");

            article.innerHTML = `
                <div class="avatar"></div>
                <div class="post-content">
                    <div class="post-header">
                        <b>${tweets.usuario.nome} @${tweets.usuario.username}</b> <span>• ${new Date(tweets.dtCriacao).toLocaleString()}</span>
                    
                        ${!isOwner && !tweets.estouSeguindo ?
                    `<span class="btn-follow" data-id="${tweets.userId}"> 
                                Seguir 
                            </span>
                        ` : ""}  

                        ${!isOwner && tweets.estouSeguindo ? `<span class="btn-following" data-id="${tweets.userId}">Seguindo</span>` : ""} 
                    
                    </div>
                    <div class="post-text">${tweets.conteudo}</div>
                    <div class="post-footer">   
                        <button class="icon-button">💬</button>
                        <button class="icon-button">🔄</button>
                        <button class="icon-button">❤️</button>
                        
                        ${isOwner ? `
                            <button class="icon-button btn-editar" data-id="${tweets.id}" data-conteudo="${tweets.conteudo}">✏️</button>
                            <button class="icon-button btn-deletar" data-id="${tweets.id}">🗑️</button>
                        ` : ""}   
                    </div>
                </div>
            `;

            feedList.appendChild(article);

            if (isOwner) {
                const btnEditar = article.querySelector(".btn-editar");
                const btnDeletar = article.querySelector(".btn-deletar");

                btnEditar.addEventListener("click", async () => {
                    const novoConteudo = prompt("Editar tweet:", tweets.conteudo);

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
                            method: 'DELETE',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                userId: usuarioLogado.id
                            })
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
            }

            if (!isOwner && !tweets.estouSeguindo) {
                const btnFollow = article.querySelector(".btn-follow");

                btnFollow.addEventListener("click", async () => {
                    const userIdParaSeguir = btnFollow.dataset.id;

                    try {
                        const resposta = await fetch(
                            `http://localhost:3000/api/follows/${userIdParaSeguir}`,
                            {
                                method: "POST",
                                headers: {
                                    userId: usuarioLogado.id
                                }
                            }
                        );

                        const resultado = await resposta.json();

                        if (!resposta.ok) {
                            alert(resultado.message || "Erro ao seguir");
                            return;
                        }
                        carregarTweets();

                    } catch (error) {
                        console.error(error);
                        alert("Erro ao conectar com a API");
                    }
                });
            }

            // se o ID de quem tweetou é diferente do IdLogado e estou seguindo
            if (!isOwner && tweets.estouSeguindo) {
                const btnUnfollow = article.querySelector(".btn-following");

                btnUnfollow.addEventListener("click", async () => {
                    const userIdUnfollow = btnUnfollow.dataset.id;

                    try {
                        const resposta = await fetch(
                            `http://localhost:3000/api/follows/${userIdUnfollow}`,
                            {
                                method: "DELETE",
                                headers: {
                                    userId: usuarioLogado.id
                                }
                            }
                        );

                        const resultado = await resposta.json();

                        if (!resposta.ok) {
                            alert(resultado.message || "Erro ao deixa de seguir");
                            return;
                        }
                        carregarTweets();
                        alert("Você deixou de seguir esse usuário.");

                    } catch (error) {
                        console.error(error);
                        alert("Erro ao conectar com a API");
                    }
                });
            }
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
            const campoTweet = document.getElementById("tweetContent");
            const contador = document.getElementById("contador");

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
                    alert(resultado.message || "Erro ao criar seu post");
                    return;
                }

                campoTweet.value = "";
                campoTweet.style.height = "auto";

                if (contador) {
                    contador.textContent = "0/280";
                    contador.style.color = "#667";
                }

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