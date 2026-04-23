import { prisma } from "../../database/prisma";
import { CreateTweetDto, UpdateTweetDto } from "../post/post.dto";

export class PostRepository {

    // criar Tweet
    public async criarTweet(dados: CreateTweetDto) {
        const tweet = await prisma.tweet.create({
            data: {
                conteudo: dados.conteudo,
                userId: dados.userId
            }
        });
        console.log('✅ Tweet criado:', tweet);
        return tweet;
    }

    // atualizar tweet
    public async updateTweet(id: string, dados: UpdateTweetDto) {
        const tweet = await prisma.tweet.update({
            where: { id }, data: dados
        });
        console.log('✅ Tweet atualizado:', tweet);
        return tweet;
    }

    // deletar tweet
    public async deletarTweetPorId(id: string) {
        const tweet = await prisma.tweet.delete({
            where: { id }
        });
        console.log('✅ Tweet deletado:', tweet);
        return tweet;
    }

    // buscar tweet por Id
    public async obterPorId(id: string) {
        const tweet = await prisma.tweet.findUnique({
            where: { id },
            select: {
                id: true,
                userId: true,
                conteudo: true,
                dtCriacao: true,
                dtUpdate: true
            }
        });
        console.log('✅ Tweet encontrado:', tweet);
        return tweet;
    }

    // listar
    public async listarTweets() {
        return await prisma.tweet.findMany({
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
    }
}