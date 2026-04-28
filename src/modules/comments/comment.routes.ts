import { Router } from "express";
import { CommentController } from "./comment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const commentController = new CommentController();

router.post("/comments", authMiddleware, async (req, res) => {
    try {
        await commentController.criar(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

router.put("/comments/:id", authMiddleware, async (req, res) => {
    try {
        await commentController.update(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

router.delete("/comments/:id", authMiddleware, async (req, res) => {
    try {
        await commentController.deletar(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

router.get("/comments/tweet/:id", authMiddleware, async (req, res) => {
    try {
        await commentController.listarCommentTweet(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

export default router