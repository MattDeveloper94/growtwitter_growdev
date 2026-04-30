import { Router } from "express";
import { UserController, UserFotoPerfilController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();
const userController = new UserController();
const userFotoPerfilController = new UserFotoPerfilController();

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

router.put("/users/foto", authMiddleware, upload.single("fotoPerfil"), async (req, res) => {
    try {
        await userFotoPerfilController.upload(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

router.get("/users/me", authMiddleware, async (req, res) => {
    try {
        await userController.me(req, res);
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

export default router;
