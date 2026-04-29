import { CreateUsuarioDto } from "./user.dto";
import { Request, Response } from "express";
import { UserService, FotoPerfilService } from "./user.service";

const userService = new UserService();
const fotoPerfilService = new FotoPerfilService();

export class UserController {
    public async criar(req: Request<any, any, CreateUsuarioDto>, res: Response) {

        const { nome, username, email, senha, dtNascimento } = req.body;
        const result = await userService.createUsuario({ nome, username, email, senha, dtNascimento });

        return res.json(result);
    }
}

export class UserFotoPerfilController {
    public async upload(req: Request, res: Response) {

        const id = (req as any).usuario.id;
        const fotoPerfil = `/uploads/${req.file?.filename}`;

        const result = await fotoPerfilService.uploadFotoPerfil(id, { fotoPerfil });

        return res.json(result);
    }
}