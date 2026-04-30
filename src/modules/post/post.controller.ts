import { PostService } from "./post.service"
import { Request, Response } from "express";
import { CreateTweetDto, UpdateTweetDto } from "./post.dto";

const postService = new PostService();

export class PostController {
    public async criar(req: Request<any, any, CreateTweetDto> & { file?: Express.Multer.File }, res: Response) {
        //id do usuário logado que veio de dentro do token
        const userId = (req as any).usuario.id;
        const { conteudo, replyId } = req.body;

        const fotoTweet = req.file
            ? `/uploads/${req.file.filename}`
            : undefined;

        const result = await postService.createTweet({
            conteudo,
            replyId,
            userId,
            fotoTweet
        });
        return res.json(result);
    }

    public async update(req: Request<any, any, UpdateTweetDto> & { file?: Express.Multer.File }, res: Response) {
        //id do usuário logado que veio de dentro do token
        const userId = (req as any).usuario.id;
        const id = req.params.id as string;
        const dados = req.body as UpdateTweetDto;

        const fotoTweet = req.file
            ? `/uploads/${req.file.filename}`
            : undefined;

        const dadosAtualizados = {
            ...dados,
            ...(fotoTweet && { fotoTweet })
        };

        const result = await postService.updateTweet(id, userId, dadosAtualizados);
        return res.json(result);
    }


    public async deletar(req: Request, res: Response) {
        //id do usuário logado que veio de dentro do token
        const userId = (req as any).usuario.id;
        const id = req.params.id as string;

        const result = await postService.deletarTweet(id, userId);
        return res.json(result);
    }
}