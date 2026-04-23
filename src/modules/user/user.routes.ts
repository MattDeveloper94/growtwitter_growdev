import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

//API - users → CRIANDO USUARIO
router.post("/users", async (req, res) => {
    try {
        await userController.criar(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

export default router;
