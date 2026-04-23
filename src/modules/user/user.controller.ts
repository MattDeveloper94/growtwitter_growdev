import { CreateUsuarioDto } from "./user.dto";
import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
    public async criar(req: Request<any, any, CreateUsuarioDto>, res: Response) {
        const { nome, username, email, senha, dtNascimento, fotoPerfil } = req.body;
        const result = await userService.createUsuario({ nome, username, email, senha, dtNascimento, fotoPerfil });
        return res.json(result);
    }
}