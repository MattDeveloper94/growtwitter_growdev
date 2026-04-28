import { Request, Response } from "express";
import { LikeService } from "./like.service";

const likeService = new LikeService();

export class LikeController {

    public async criarLike(req: Request, res: Response) {
        const usuarioId = (req as any).usuario.id // id do usuário logado (validado pelo middleware)
        const tweetId = req.params.id as string //id do tweet que veio na requisicao pela (rota - URL)

        if (!tweetId)
            throw new Error("ID não recebido.");

        const resultado = await likeService.criarLike(usuarioId, tweetId);
        return res.json(resultado);
    }

    public async deletarLike(req: Request, res: Response) {
        const usuarioId = (req as any).usuario.id // id do usuário logado (validado pelo middleware)
        const tweetId = req.params.id as string //id do tweet que veio na requisicao pela (rota - URL)

        if (!tweetId)
            throw new Error("ID não recebido.");

        const resultado = await likeService.deletarLike(usuarioId, tweetId);
        return res.json(resultado);
    }
}