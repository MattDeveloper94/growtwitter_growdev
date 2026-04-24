import { Request, Response } from "express";
import { FeedService } from "./feed.service";

const feedService = new FeedService();

export class FeedController {

    public async listar(req: Request, res: Response) {
        //pega o userId que veio no headers da requisição e trata ele como string
        const userId = req.headers.userid as string;
        const result = await feedService.timeLine(userId);
        return res.json(result);
    }

    public async listarExplore(req: Request, res: Response) {
        const userIdExplore = req.headers.userid as string;
        const resultExplore = await feedService.explore(userIdExplore);
        return res.json(resultExplore);
    }
}