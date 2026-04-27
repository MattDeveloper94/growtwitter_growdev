import { PostService } from "./post.service"
import { Request, Response } from "express";
import { CreateTweetDto, UpdateTweetDto } from "./post.dto";

const postService = new PostService();

export class PostController {
    public async criar(req: Request<any, any, CreateTweetDto>, res: Response) {
        //id do usuário logado que veio de dentro do token
        const userId = (req as any).usuario.id;
        const { conteudo } = req.body;

        const result = await postService.createTweet({
            conteudo,
            userId
        });
        return res.json(result);
    }

    public async update(req: Request, res: Response) {
        //id do usuário logado que veio de dentro do token
        const userId = (req as any).usuario.id;
        const id = req.params.id as string;
        const dados = req.body as UpdateTweetDto;

        const result = await postService.updateTweet(id, userId, dados);
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