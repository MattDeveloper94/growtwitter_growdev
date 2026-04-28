import { prisma } from "../../database/prisma";

export class LikeRepository {

    public async criarLike(usuarioId: string, tweetId: string) {
        return await prisma.like.create({
            data: {
                usuarioId,
                tweetId
            }
        });
    }

    public async deletarLike(usuarioId: string, tweetId: string) {
        return await prisma.like.delete({
            where: {
                usuarioId_tweetId: {
                    usuarioId,
                    tweetId
                }
            }
        });
    }

    public async buscarLike(usuarioId: string, tweetId: string) {
        return await prisma.like.findUnique({
            where: {
                usuarioId_tweetId: {
                    usuarioId,
                    tweetId
                }
            }
        });
    }

}