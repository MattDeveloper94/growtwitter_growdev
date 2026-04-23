import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/auth", async (req, res) => {
    try {
        await authController.login(req, res)
    } catch (error: any) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
});

export default router;