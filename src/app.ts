import express from "express";
import { handleError } from "./middlewares/error.handler";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import postRouter from "./modules/post/post.routes";
import followRouter from "./modules/follow/follow.routes";
import feedRouter from "./modules/feed/feed.routes";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", followRouter);
app.use("/api", feedRouter);

//rota
app.get("/", (req, res) => {
    res.send("API rodando!");
});

app.get("/erro", (req, res) => {
    throw new Error("Teste de erro");
});

app.get("/prisma-erro", async (req, res) => {
    throw new Error("erro vindo do service");
});

//middleware de erro
app.use(handleError);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});