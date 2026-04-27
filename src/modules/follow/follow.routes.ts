import { Router } from "express";
import { FollowController } from "./follow.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const followController = new FollowController();

router.post("/follows/:id", authMiddleware, async (req, res) => {
    try {
        await followController.seguir(req, res)
    } catch (error: any) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
});

router.delete("/follows/:id", authMiddleware, async (req, res) => {
    try {
        await followController.deletar(req, res)
    } catch (error: any) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
});

export default router;