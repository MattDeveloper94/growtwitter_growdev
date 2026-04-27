import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginUsuarioDto } from "./auth.dto";

const authService = new AuthService();

export class AuthController {
    //                 req: Request<{parms}, {resp}, {body}>
    public async login(req: Request<any, any, LoginUsuarioDto>, res: Response) {

        const { email, senha, username } = req.body;
        const result = await authService.login({ email, senha, username });

        return res.json(result);
    }
}