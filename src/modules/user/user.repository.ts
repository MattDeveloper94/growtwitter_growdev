import { prisma } from "../../database/prisma"
import { CreateUsuarioDto, UpdateUsuarioDto } from "../user/user.dto"

export class UserRepository {
 
    // criar novo usuario
    public async createUsuario(dados: CreateUsuarioDto) {
        const usuario = await prisma.usuario.create({
            data: dados
        });
        //log temporario
        console.log('✅ Usuário criado:', usuario);
        return usuario;
    }

    // atualizar usuario
    public async updateUsuario(id: string, dados: UpdateUsuarioDto) {
        const usuario = await prisma.usuario.update({
            where: {id}, data: dados // se os dados estao iguais pode simplificar id: id → id
        });
        console.log('✅ Usuário atualizado:', usuario);
        return usuario;
    }
}