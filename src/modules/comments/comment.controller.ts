import { Request, Response } from "express";
import { CommentService } from "./comment.service";
import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";

const commentService = new CommentService();

export class CommentController {
    public async criar(req: Request<any, any, CreateCommentDto>, res: Response) {
        const userId = (req as any).usuario.id;
        const { conteudo, tweetId } = req.body;

        const result = await commentService.createComment({
            conteudo,
            tweetId,
            userId
        });
        return res.json(result);
    }

    public async update(req: Request, res: Response) {
        const userId = (req as any).usuario.id;
        const id = req.params.id as string;
        const dados = req.body as UpdateCommentDto;

        const result = await commentService.updateComment(id, userId, dados);
        return res.json(result);
    }

    public async deletar(req: Request, res: Response) {
        const userId = (req as any).usuario.id;
        const id = req.params.id as string;

        const result = await commentService.deletarComment(id, userId);
        return res.json(result);
    }

    public async listarCommentTweet(req: Request, res: Response) {
        const tweetId = req.params.id as string;

        const result = await commentService.listarCommentTweet(tweetId);
        return res.json(result);
    }
}