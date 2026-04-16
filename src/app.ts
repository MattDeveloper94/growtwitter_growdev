import express from "express";
import { handleError } from "./middlewares/error.handler";

const app = express();

app.use(express.json());

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