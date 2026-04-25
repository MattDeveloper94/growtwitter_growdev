import { PostService } from "./post.service"
import { Request, Response } from "express";
import { CreateTweetDto, UpdateTweetDto } from "./post.dto";

const postService = new PostService();

export class PostController {
    public async criar(req: Request<any, any, CreateTweetDto>, res: Response) {
        const conteudo = req.body;
        const result = await postService.createTweet(conteudo);
        return res.json(result);
    }

    public async update(req: Request<{ id: string }, any, UpdateTweetDto>, res: Response) {
        // removendo id do body, pois tem na interface → erro de conflito
        const id = req.params.id;
        const dados = req.body;

        const result = await postService.updateTweet(id, dados);
        return res.json(result);
    }


    public async deletar(req: Request<{ id: string }>, res: Response) {
        const { userId } = req.body;
        const { id } = req.params;
        const result = await postService.deletarTweet(id, userId);
        return res.json(result);
    }
}