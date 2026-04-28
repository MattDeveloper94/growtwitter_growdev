import { Router } from "express";
import { LikeController } from "./like.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const likeController = new LikeController();

router.post("/likes/:id", authMiddleware, async (req, res) => {
    try {
        await likeController.criarLike(req, res)
    } catch (error: any) {
        res.status(400).json({
            ok: false,
            message: error.message
        });
        return;
    }
});

router.delete("/likes/:id", authMiddleware, async (req, res) => {
    try {
        await likeController.deletarLike(req, res)
    } catch (error: any) {
        res.status(400).json({
            ok: false,
            message: error.message
        });
        return;
    }
});

export default router;