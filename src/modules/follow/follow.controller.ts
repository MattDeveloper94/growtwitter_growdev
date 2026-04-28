import { Request, Response } from "express";
import { FollowService } from "./follow.service";

const followService = new FollowService();

export class FollowController {

    public async seguir(req: Request, res: Response) {

        const followerId = (req as any).usuario.id;// logado
        const id = req.params.id as string; // id de quem quero seguir

        if (!id) {
            throw new Error("ID não informado");
        }

        const seguindo = await followService.follow(followerId, id);
        return res.json(seguindo);
    }

    public async deletar(req: Request, res: Response) {

        const followerId = (req as any).usuario.id; // logado
        const id = req.params.id as string; // id de quem quero deixa de seguir

        if (!id) {
            throw new Error("ID não informado");
        }

        const paraSeguir = await followService.Unfollow(followerId, id);
        return res.json(paraSeguir);
    }
}