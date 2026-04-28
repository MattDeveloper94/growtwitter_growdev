import { prisma } from "../../database/prisma";
import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";

export class CommentRepository {

    public async criarComentario(dados: CreateCommentDto) {
        const comentario = await prisma.comment.create({
            data: {
                conteudo: dados.conteudo,
                userId: dados.userId,
                tweetId: dados.tweetId
            }
        });
        console.log('✅ Comentario criado:', comentario);
        return comentario;
    }

    public async updateComentario(id: string, dados: UpdateCommentDto) {
        const comentario = await prisma.comment.update({
            where: {
                id
            },
            data: dados
        });
        console.log('✅ Comentario atualizado:', comentario);
        return comentario;
    }

    public async deletarCommentPorId(id: string) {
        const comentario = await prisma.comment.delete({
            where: {
                id
            }
        });
        console.log('✅ Comentario deletado:', comentario);
        return comentario;
    }

    // listar
    public async listarComment() {
        const listComment = await prisma.comment.findMany({
            include: {
                usuario: {
                    select: {
                        nome: true,
                        username: true
                    }
                }
            },
            orderBy: {
                dtCriacao: "desc"
            }
        });
        console.log('✅ Comentarios listdos:', listComment);
        return listComment;
    }

    // buscar comentario por Id
    public async obterPorId(id: string) {
        const comentario = await prisma.comment.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                conteudo: true,
                dtCriacao: true,
                dtUpdate: true,
                userId: true
            }
        });
        console.log('✅ Comentario encontrado:', comentario);
        return comentario;
    }

    public async listarPorTweet(tweetId: string) {
        const listarCommentTwId = await prisma.comment.findMany({
            where: {
                tweetId
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        username: true
                    }
                }
            },
            orderBy: {
                dtCriacao: "desc"
            }
        });
        console.log('✅ Cometario listado por TweetID:', listarCommentTwId);
        return listarCommentTwId;
    }
}