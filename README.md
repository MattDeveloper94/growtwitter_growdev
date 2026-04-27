# 🐦 GrowTwitter

Aplicação inspirada no Twitter desenvolvida durante o curso de Formação em Desenvolvimento Web Back-End com Node.js e C# (GrowDev).

---

## 🚀 Tecnologias

● Node.js
● Typescript
● Express.js
● API Rest
● Programação Orientada a Objetos
● PostgreSQL
● PrismaORM
● HTML, CSS e JavaScript

---

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Token) para autenticação e proteção de rotas.

🔑 Como funciona
- 1. O usuário realiza login
- 2. O backend gera um token JWT contendo o id do usuário
- 3. O frontend armazena o token no localStorage
- 4. Todas as requisições protegidas enviam:
- 5. Authorization: Bearer TOKEN
- 6. O middleware valida o token e libera o acesso

---

## 🛡️ Segurança

- O backend identifica o usuário através do token
- Validação de permissão para:
    ● editar tweets
    ● deletar tweets
    ● seguir/deixar de seguir usuários

---

## 💻 Funcionalidades

- Cadastro de usuário ✅ concluído
- Login e autenticação ✅ concluído
- Logout ✅ concluído
- Criar posts [associado e autenticado] ✅ concluído
- Atualizar posts [associado e autenticado] ✅ concluído
- Deletar posts [associado e autenticado] ✅ concluído
- Reply posts (em desenvolvimento)
- Visualizar feed (timeline, com Tweets de quem você segue) ✅ concluído
- Visualizar Explore (todos Tweets) ✅ concluído
- Funcionalidade de seguir e deixar de seguir usuários [associado e autenticado] ✅ concluído
- Sistema de perfil de usuário (em desenvolvimento)
- Autenticação com JWT ✅ concluído

---

## 📸 Preview

![Preview do projeto](./public/img/index.png)
![Preview do projeto](./public/img/cadastro.png)
![Preview do projeto](./public/img/home.png)

---

## 📡 Rotas principais

    🔐 Autenticação
        ● POST /api/auth → login
    👤 Usuário
        ● POST /api/users → cadastro
    📝 Tweets
        ● POST /api/tweets → criar tweet
        ● PUT /api/tweets/:id → editar tweet
        ● DELETE /api/tweets/:id → deletar tweet
    📰 Feed
        ● GET /api/feed → timeline (tweets seus + tweets de quem você segue)
    🌎 Explore
        ● GET /api/explore → feed público (tweets de todos os usuários)
    🤝 Follow
        ● POST /api/follows/:id → seguir
        ● DELETE /api/follows/:id → deixar de seguir

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
