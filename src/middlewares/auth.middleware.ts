import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// tipando payload com o campo id string
type JwtPayload = { id: string }

//func de autenticação
export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //autenticação header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            message: "Token inválido."
        });
        return;
    }

    //pegando a 2 parte da string → indice [1]: "abc123TOKEN" | ?.trim() só executa se existir | trim → remove espaço no começo e fim da string
    const token = authHeader.split(" ")[1]?.trim();

    if (!token) {
        res.status(401).json({
            message: "Token inválido."
        });
        return;
    }

    try {
        //validando token → verifica se esse token foi criado com o segredo "segredo_jwt" e se ele continua ativo.”
        const payload = jwt.verify(token, "segredo_jwt") as JwtPayload;

        // cria um campo chamado usuario dentro do req, dizendo pra ignorar a tipagem (any), e esse campo recebe o payload do JWT.”
        (req as any).usuario = payload;

        next();

    } catch (error) {
        // console.error(error) → exibe o erro real no backend
        console.error(error);
        res.status(401).json({
            message: "Token inválido ou expirado." // resposta enviada ao frontend
        });
        return;
    }
}