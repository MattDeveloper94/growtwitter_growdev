import { Router } from "express";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

//API - users → CRIANDO USUARIO
router.post("/users", async (req, res) => {
    try {
        const usuario = await userService.createUsuario(req.body);

        return res.status(201).send({
            ok: true,
            message: "Usuário criado com sucesso!",
            dados: usuario
        });
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

export default router;
