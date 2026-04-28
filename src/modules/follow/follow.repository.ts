import { prisma } from "../../database/prisma";

export class FollowRepository {

    // listar tweet meus + quem eu sigo // usando no feed.service
    public async listarSeguindo(userIdLogado: string) { 
        return await prisma.follow.findMany({
            where: {
                followerId: userIdLogado,
            },
            select: {
                followingId: true
            }
        });
    }

    // criar follow
    public async criar(followerId: string, followingId: string) {
        return await prisma.follow.create({
            data: {
                followerId,
                followingId
            }
        });
    }

    // deletar follow
    public async deletar(followerId: string, followingId: string) {
        return await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });
    }
}