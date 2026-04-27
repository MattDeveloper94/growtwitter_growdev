import { Router } from "express";
import { PostController } from "./post.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const postController = new PostController();

//API → CRIAR tweet
router.post("/tweets", authMiddleware, async (req, res) => {
    try {
        await postController.criar(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

//API → ATUALIZAR tweet
router.put("/tweets/:id", authMiddleware, async (req, res) => {
    try {
        await postController.update(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        });
    }
});

//API → DELETAR tweet
router.delete("/tweets/:id", authMiddleware, async (req, res) => {
    try {
        await postController.deletar(req, res)
    } catch (error: any) {
        return res.status(400).send({
            ok: false,
            message: error.message
        })
    }
});

export default router