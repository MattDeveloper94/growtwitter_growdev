# 🐦 GrowTwitter

Aplicação inspirada no Twitter desenvolvida durante o curso de Formação em Desenvolvimento Web Back-End com Node.js e C# (GrowDev).

---

## 🚀 Tecnologias

-     Node.js
-     TypeScript
-     Express
-     API REST
-     Programação Orientada a Objetos (POO)
-     PostgreSQL
-     Prisma ORM
-     HTML, CSS e JavaScript
-     JWT Authentication

---

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Token) para autenticação e proteção de rotas.

🔑 Como funciona
-     1. O usuário realiza login
-     2. O backend gera um token JWT contendo o id do usuário
-     3. O frontend armazena o token no localStorage
-     4. Todas as requisições protegidas enviam:
-     5. Authorization: Bearer TOKEN
-     6. O middleware valida o token e libera o acesso

---

## 🛡️ Segurança

- O backend identifica o usuário através do token
- Validação de permissão para:
-     editar tweets [associado e autenticado] ✅ concluído
-     deletar tweets [associado e autenticado] ✅ concluído
-     seguir/deixar de seguir usuários [associado e autenticado] ✅ concluído
-     reply tweets [associado e autenticado] ✅ concluído
-     comentar tweets [associado e autenticado] ✅ concluído
-     editar comentários [associado e autenticado] ✅ concluído
-     deletar comentários [associado e autenticado] ✅ concluído
-     curtidas de usuários [associado e autenticado] ✅ concluído

---

## 💻 Funcionalidades

-     Cadastro de usuário ✅ concluído
-     Login e autenticação ✅ concluído
-     Logout ✅ concluído
-     Criar posts [associado e autenticado] ✅ concluído
-     Atualizar posts [associado e autenticado] ✅ concluído
-     Deletar posts [associado e autenticado] ✅ concluído
-     Reply posts ✅ concluído
-     Comentar posts ✅ concluído
-     Curtir posts ✅ concluído
-     Upload de imagens no post (em desenvolvimento)
-     Upload de imagens foto do perfil (em desenvolvimento)
-     Visualizar feed (timeline, com Tweets de quem você segue) ✅ concluído
-     Visualizar Explore (todos Tweets) ✅ concluído
-     Funcionalidade de seguir e deixar de seguir usuários [associado e autenticado] ✅ concluído
-     Sistema de perfil de usuário (em desenvolvimento)
-     Sistema de Teste
-     Docker
-     Autenticação com JWT ✅ concluído

---

## 📸 Preview

![Preview do projeto](./public/img/index.png)
![Preview do projeto](./public/img/cadastro.png)
![Preview do projeto](./public/img/home.png)

---

## 📡 Rotas principais

    🔐 Autenticação
        POST /api/auths → login
    👤 Usuário
        POST /api/users → cadastro
    📝 Tweets
        POST /api/tweets → criar tweet
        PUT /api/tweets/:id → editar tweet
        DELETE /api/tweets/:id → deletar tweet
    🔁 Reposts / Replies
        POST /api/tweets + replyId → repostar tweet
    💬 Comentários
        POST /api/comments → criar comentário
        PUT /api/comments/:id → editar comentário
        DELETE /api/comments/:id → deletar comentário
        GET /api/comments/tweet/:id → listar comentários do tweet
    ❤️ Likes
        POST /api/likes/:id → curtir tweet
        DELETE /api/likes/:id → remover curtida
    📰 Feed
        GET /api/feed → timeline (tweets seus + tweets de quem você segue)
    🌎 Explore
        GET /api/explore → feed público (tweets de todos os usuários)
    🤝 Follow
        POST /api/follows/:id → seguir usuário
        DELETE /api/follows/:id → deixar de seguir

---

## ⚙️ Como rodar o projeto

```bash
# clonar repositório
git clone https://github.com/MattDeveloper94/growtwitter_growdev.git

# entrar na pasta
cd growtwitter_growdev

# instalar dependências
npm install

# rodar servidor
npm run dev
```
