async function carregarTweets() {
    try {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "index.html";
            return;
        }

        const resposta = await fetch("http://localhost:3000/api/feed", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (resposta.status === 401) {
            logout();
            return;
        }

        if (!resposta.ok) {
            const erro = await resposta.json();
            alert(erro.message);
            return;
        }

        const dado = await resposta.json();
        const feedList = document.getElementById("feedList");

        //limpar texto do feedlist>post-text
        feedList.innerHTML = "";

        dado.tweets.forEach((tweets) => {
            const isOwner = tweets.userId === usuarioLogado.id;
            const article = document.createElement("article");

            const dataCriacao = new Date(tweets.dtCriacao).toLocaleDateString();
            const dataUpdate = new Date(tweets.dtUpdate).toLocaleDateString();
            const foiEditado = tweets.dtCriacao !== tweets.dtUpdate;

            article.classList.add("post");

            article.innerHTML = `
                <div class="avatar"></div>
                <div class="post-content">
                ${tweets.replyTo ? `
                    <div class="reply-original">
                        <b>${tweets.replyTo.usuario.nome} @${tweets.replyTo.usuario.username}</b>
                        <p>${tweets.replyTo.conteudo}</p>
                    </div>

                    <div class="post-header">
                        <b>${tweets.usuario.nome} @${tweets.usuario.username}</b> 
                        <span>
                            • ${foiEditado ? `Editado em ${dataUpdate}` : dataCriacao}
                        </span>

                        ${!isOwner && !tweets.estouSeguindo ?
                        `<span class="btn-follow" data-id="${tweets.userId}"> 
                                Seguir 
                             </span>
                         ` : ""}  

                        ${!isOwner && tweets.estouSeguindo ?
                        `<span class="btn-following" data-id="${tweets.userId}">
                                Seguindo
                            </span>
                        ` : ""}
                    </div>
                ` : `
                    <div class="post-header">
                        <b>${tweets.usuario.nome} @${tweets.usuario.username}</b> 
                        <span>
                            • ${foiEditado ? `Editado em ${dataUpdate}` : dataCriacao}
                        </span>

                        ${!isOwner && !tweets.estouSeguindo ?
                    `<span class="btn-follow" data-id="${tweets.userId}"> 
                                Seguir 
                            </span>
                        ` : ""}  

                        ${!isOwner && tweets.estouSeguindo ?
                    `<span class="btn-following" data-id="${tweets.userId}">
                                Seguindo
                            </span>
                        ` : ""}
                    </div>
                `}
                    <div class="post-text">${tweets.conteudo}</div>
                    <div class="post-footer">   

                        <div class="action-item">
                            <button class="icon-button comment-btn ${tweets.totalComments > 0 ? "commented" : ""}" 
                                title="comentar" 
                                data-id="${tweets.id}"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path 
                                        d="M21 12a8.5 8.5 0 0 1-8.5 8.5H5l2.2-2.2A8.5 8.5 0 1 1 21 12z"
                                    />
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.0"
                                </svg>
                            </button>
                            <span class="action-count comment-count">${tweets.totalComments || 0}</span>
                        </div>

                        <div class="action-item">
                            <button class="icon-button reply-btn ${tweets.repostado ? "reposted" : ""}"
                                title="republicar" 
                                data-id="${tweets.id}"
                                data-conteudo="${tweets.conteudo}"
                                data-nome="${tweets.usuario.nome}"
                                data-username="${tweets.usuario.username}"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M17 7H7l4-4"/>
                                    <path d="M7 7h9a5 5 0 0 1 0 10H7"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.0"
                                    />
                                </svg>
                            </>
                            <span class="action-count">${tweets.totalReplies || 0}</span>
                        </div>
                        
                        <div class="action-item">
                            <button class="icon-button like-btn ${tweets.curtido ? "liked" : ""}" 
                                title="curtir" 
                                data-id="${tweets.id}" 
                                data-liked="${tweets.curtido}"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path 
                                        d="M16.697 5.5c-1.222 0-2.31.593-3.02 1.507-.71-.914-1.798-1.507-3.02-1.507C8.5 5.5 7 7 7 8.85c0 3.4 3.4 6.2 6.677 9.15L13.677 18l.323-.25C17.277 15.05 20.677 12.25 20.677 8.85 20.677 7 19.177 5.5 16.697 5.5z"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.0"
                                    />
                                </svg>
                            </button>
                            <span class="action-count">${tweets.totalLikes || 0}</span>
                        </div>

                        ${isOwner ? `

                            <div class="action-item">
                                <button class="icon-button btn-editar" title="editar" data-id="${tweets.id}" data-conteudo="${tweets.conteudo}">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.0"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div class="action-item">
                                <button class="icon-button btn-deletar" title="apagar" data-id="${tweets.id}">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M3 6h18"/>
                                        <path d="M8 6V4h8v2"/>
                                        <path d="M6 6l1 15h10l1-15"/>
                                        <path d="M10 11v6"/>
                                        <path d="M14 11v6"/>
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.0"
                                    </svg>
                                </button>
                            </div>

                        ` : ""} 
                    </div>
                    <div class="comments-container" style="display: none;"></div>
                    <div class="comment-form" style="display: none;">
                        <textarea class="comment-input" placeholder="Escreva um comentário..."></textarea>
                        <button class="btn-send-comment">Comentar</button>
                    </div>
                </div>
            `;

            // adicionando todo article no feedlist
            feedList.appendChild(article);

            if (isOwner) {
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
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                conteudo: novoConteudo
                            })
                        });

                        if (resposta.status === 401) {
                            logout();
                            return;
                        }

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
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        });

                        if (resposta.status === 401) {
                            logout();
                            return;
                        }

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
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                        if (resposta.status === 401) {
                            logout();
                            return;
                        }

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
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                        if (resposta.status === 401) {
                            logout();
                            return;
                        }

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


            const btnReply = article.querySelector(".reply-btn");

            btnReply.addEventListener("click", async () => {
                const tweetId = btnReply.dataset.id;
                const conteudoOriginal = btnReply.dataset.conteudo;
                const nome = btnReply.dataset.nome;
                const username = btnReply.dataset.username;

                const resposta = prompt(
                    `${nome} @${username}\n\n${conteudoOriginal}\n\nResponder:`
                );

                if (!resposta || !resposta.trim()) {
                    return;
                }

                const retorno = await fetch("http://localhost:3000/api/tweets", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        conteudo: resposta,
                        replyId: tweetId
                    })
                });

                if (retorno.status === 401) {
                    logout();
                    return;
                }

                if (!retorno.ok) {
                    const erro = await retorno.json();
                    alert(erro.message || "Erro ao responder tweet");
                    return;
                }

                carregarTweets();
            });

            const btnComment = article.querySelector(".comment-btn");
            const commentsContainer = article.querySelector(".comments-container");
            const commentCount = article.querySelector(".comment-count");
            const commentForm = article.querySelector(".comment-form");
            const commentInput = article.querySelector(".comment-input");
            const btnSendComment = article.querySelector(".btn-send-comment");

            async function carregarComentarios(tweetId) {
                const resposta = await fetch(`http://localhost:3000/api/comments/tweet/${tweetId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const resultado = await resposta.json();

                commentsContainer.innerHTML = "";

                resultado.comments.forEach((comment) => {
                    const dataCriacao = new Date(comment.dtCriacao).toLocaleDateString();
                    const dataUpdate = new Date(comment.dtUpdate).toLocaleDateString();

                    const foiEditado = comment.dtCriacao !== comment.dtUpdate;
                    const isCommentOwner = comment.userId === usuarioLogado.id;

                    commentsContainer.innerHTML += `
                    <div class="comment-item" data-id="${comment.id}">
                        <b>
                            ${comment.usuario.nome} @${comment.usuario.username}
                            <span>
                                • ${foiEditado ? `Editado em ${dataUpdate}` : dataCriacao}
                            </span>
                        </b>
                        <p>${comment.conteudo}</p>

                        ${isCommentOwner ? `
                            <div class="comment-actions">

                                <button 
                                    class="icon-button btn-edit-comment"
                                    data-id="${comment.id}"
                                    data-conteudo="${comment.conteudo}"
                                    title="editar"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                                    </svg>
                                </button>

                                <button 
                                    class="icon-button btn-delete-comment"
                                    data-id="${comment.id}"
                                    title="apagar"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M3 6h18"/>
                                        <path d="M8 6V4h8v2"/>
                                        <path d="M6 6l1 15h10l1-15"/>
                                        <path d="M10 11v6"/>
                                        <path d="M14 11v6"/>
                                    </svg>
                                </button>

                            </div>
                        ` : ""}
                    </div>
                `;
                });

                commentsContainer.querySelectorAll(".btn-edit-comment").forEach((btn) => {
                    btn.addEventListener("click", async () => {
                        const id = btn.dataset.id;
                        const conteudoAtual = btn.dataset.conteudo;

                        const novoConteudo = prompt("Editar comentário:", conteudoAtual);

                        if (!novoConteudo || !novoConteudo.trim()) return;

                        await fetch(`http://localhost:3000/api/comments/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                conteudo: novoConteudo
                            })
                        });

                        await carregarComentarios(tweetId);
                    });
                });

                commentsContainer.querySelectorAll(".btn-delete-comment").forEach((btn) => {
                    btn.addEventListener("click", async () => {
                        const id = btn.dataset.id;

                        await fetch(`http://localhost:3000/api/comments/${id}`, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        await carregarComentarios(tweetId);

                        commentCount.textContent = Math.max(0, Number(commentCount.textContent) - 1);
                        if (Number(commentCount.textContent) <= 0) {
                            btnComment.classList.remove("commented");
                        }
                    });
                });
            }

            btnComment.addEventListener("click", async () => {
                const tweetId = btnComment.dataset.id;

                const aberto = commentForm.style.display === "block";

                commentForm.style.display = aberto ? "none" : "block";
                commentsContainer.style.display = aberto ? "none" : "block";

                if (!aberto) {
                    await carregarComentarios(tweetId);
                }
            });

            btnSendComment.addEventListener("click", async () => {
                const tweetId = btnComment.dataset.id;
                const comentario = commentInput.value;

                if (!comentario || !comentario.trim()) {
                    return;
                }

                const resposta = await fetch("http://localhost:3000/api/comments", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        conteudo: comentario,
                        tweetId
                    })
                });

                if (resposta.status === 401) {
                    logout();
                    return;
                }

                if (!resposta.ok) {
                    const erro = await resposta.json();
                    alert(erro.message || "Erro ao comentar");
                    return;
                }

                commentInput.value = "";


                await carregarComentarios(tweetId);
                commentCount.textContent = Number(commentCount.textContent) + 1;
                if (Number(commentCount.textContent) > 0) {
                    btnComment.classList.add("commented");
                }
            });
        });

        addEventLike();

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

// add/remove like
function addEventLike() {
    const token = localStorage.getItem("token");

    document.querySelectorAll(".like-btn").forEach((botao) => {
        botao.addEventListener("click", async () => {
            const tweetId = botao.dataset.id;
            const tweetCurtido = botao.dataset.liked === "true";

            const resposta = await fetch(`http://localhost:3000/api/likes/${tweetId}`, {
                // se tweetCurtido for true → DELETE, se não → POST
                method: tweetCurtido ? "DELETE" : "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (resposta.status === 401) {
                logout();
                return;
            }

            carregarTweets();
        });
    });
}

// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    carregarTweets();
    const btnPostar = document.getElementById("btnPostar");

    if (btnPostar) {
        btnPostar.addEventListener("click", async function () {

            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = localStorage.getItem("token");

            const campoTweet = document.getElementById("tweetContent");
            const contador = document.getElementById("contador");

            if (!usuarioLogado || !token) {
                window.location.href = "index.html";
                return;
            }

            const tweet = document.getElementById("tweetContent").value;

            try {
                const resposta = await fetch("http://localhost:3000/api/tweets", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        conteudo: tweet
                    })
                });

                if (resposta.status === 401) {
                    logout();
                    return;
                }

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

    // fecha o coemntario, form se clicar fora. 
    document.addEventListener("click", (event) => {
        const clicouEmComentario = event.target.closest(".comments-container");
        const clicouNoForm = event.target.closest(".comment-form");
        const clicouNoBotaoComentario = event.target.closest(".comment-btn");

        if (clicouEmComentario || clicouNoForm || clicouNoBotaoComentario) {
            return;
        }

        document.querySelectorAll(".comments-container").forEach((container) => {
            container.style.display = "none";
        });

        document.querySelectorAll(".comment-form").forEach((form) => {
            form.style.display = "none";
        });
    });
});
