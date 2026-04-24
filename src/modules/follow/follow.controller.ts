import { Request, Response } from "express";
import { FollowService } from "./follow.service";

const followService = new FollowService();

export class FollowController {

    public async seguir(req: Request<{ id: string }>, res: Response) {

        const followerId = req.headers.userid as string; // logado
        const { id } = req.params; // id de quem quero seguir

        if (!id) {
            throw new Error("ID não informado");
        }

        const jaSegue = await followService.follow(followerId, id);

        return res.json(jaSegue);
    }

    public async deletar(req: Request<{ id: string }>, res: Response) {

        const followerId = req.headers.userid as string; // logado
        const { id } = req.params; // id de quem quero deixa de seguir

        if (!id) {
            throw new Error("ID não informado");
        }

        const naoSegue = await followService.Unfollow(followerId, id);

        return res.json(naoSegue);
    }
}