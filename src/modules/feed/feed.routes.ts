import { Router } from "express";
import { FeedController } from "./feed.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const feedController = new FeedController();

router.get("/feed", authMiddleware, async (req, res) => {
    try {
        await feedController.listar(req, res);
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

router.get("/explore", authMiddleware, async (req, res) => {
    try {
        await feedController.listarExplore(req, res);
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

export default router