import { prisma } from "../../database/prisma";

export class FollowRepository {

    // listar tweet meus + quem eu sigo
    public async listarQuemEuSigo(userIdLogado: string) {
        return await prisma.follow.findMany({
            where: {
                followerId: userIdLogado,
            },
            select: {
                followingId: true
            }
        });
    }

    // followerid → usuarioLogadoID | followingId → usuarioQueVouSeguirID
    public async jaSigo(followerId: string, followingId: string) {
        return await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
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