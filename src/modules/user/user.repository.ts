import { prisma } from "../../database/prisma"
import { CreateUsuarioDto, UpdateUsuarioDto } from "../user/user.dto"

export class UserRepository {

    // criar novo usuario
    public async criarUsuario(dados: CreateUsuarioDto) {
        const usuario = await prisma.usuario.create({
            data: {
                ...dados,
                dtNascimento: new Date(dados.dtNascimento)
            } 
        });
        console.log('✅ Usuário criado:', usuario);
        return usuario;
    }

    // atualizar usuario
    public async updateUsuario(id: string, dados: UpdateUsuarioDto) {
        const usuario = await prisma.usuario.update({
            where: { id }, data: dados // se os dados estao iguais pode simplificar id: id → id
        });
        console.log('✅ Usuário atualizado:', usuario);
        return usuario;
    }

    // Buscar usuario por email
    public async obterPorEmail(email: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                username: true,
                email: true,
                senha: true
            }
        });
        console.log('✅ Usuário encontrado:', usuario);
        return usuario;
    }

    // Buscar usuario por Id
    public async obterPorId(id: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                username: true,
                email: true,
                senha: true
            }
        });
        console.log('✅ Usuário encontrado:', usuario);
        return usuario;
    }

    // Buscar usuario por Username
    public async obterPorUsername(username: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { username },
            select: {
                id: true,
                nome: true,
                username: true,
                email: true,
                senha: true
            }
        });
        return usuario
    }


    // Deletar usuario
    public async deletarUsuario(id: string) {
        const usuario = await prisma.usuario.delete({
            where: { id },
        });
        console.log('✅ Conta deletada:', usuario);
        return usuario;
    }
}