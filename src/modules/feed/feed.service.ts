import { FollowRepository } from "../follow/follow.repository";
import { prisma } from "../../database/prisma";
import { PostRepository } from "../post/post.repository";

const followRepository = new FollowRepository();
const postRepository = new PostRepository();

export class FeedService {
    public async timeLine(userIdLogado: string) {

        // quem eu sigo
        const seguindo = await followRepository.listarSeguindo(userIdLogado);
        // pegar id
        const idsSeguindo = seguindo.map(item => item.followingId);
        // buscar meus tweets e de quem eu sigo
        const tweetsFolliwing = await prisma.tweet.findMany({
            where: {
                userId: {
                    in: [userIdLogado, ...idsSeguindo]
                }
            },
            include: {
                usuario: true,
                likes: true,
                comments: true,

                replyTo: {
                    include: {
                        usuario: true
                    }
                },

                replies: {
                    include: {
                        usuario: true
                    }
                },

                _count: {
                    select: {
                        likes: true,
                        replies: true,
                        comments: true
                    }
                }
            },
            orderBy: {
                dtCriacao: "desc"
            }
        });

        const tweetsComJaSigo = tweetsFolliwing.map(item => {
            return {
                ...item,
                totalLikes: item._count.likes,
                totalReplies: item._count.replies,
                totalComments: item._count.comments,
                // estouSeguindo = true/false
                estouSeguindo: idsSeguindo.includes(item.userId),

                curtido: item.likes.some(
                    like => like.usuarioId === userIdLogado
                ),

                repostado: item.replies.some(
                    reply =>
                        reply.userId === userIdLogado &&
                        reply.conteudo !== null
                ),

                comentado: item.comments.some(
                    comment => comment.userId === userIdLogado
                ),
            }
        });

        return {
            ok: true,
            tweets: tweetsComJaSigo
        };
    }

    public async explore(userIdLogado: string) {
        // quem eu sigo
        const seguindo = await followRepository.listarSeguindo(userIdLogado);

        // pegar id
        const idsSeguindo = seguindo.map(item => item.followingId);

        const tweetExplore = await prisma.tweet.findMany({
            include: {
                usuario: true,
                likes: true,
                comments: true,

                replyTo: {
                    include: {
                        usuario: true
                    }
                },

                replies: {
                    include: {
                        usuario: true
                    }
                },

                _count: {
                    select: {
                        likes: true,
                        replies: true,
                        comments: true
                    }
                }
            },
            orderBy: {
                dtCriacao: "desc"
            }
        });

        const tweetsComJaSigo = tweetExplore.map(item => {

            return {
                ...item,
                totalLikes: item._count.likes,
                totalReplies: item._count.replies,
                totalComments: item._count.comments,

                curtido: item.likes.some(
                    like => like.usuarioId === userIdLogado
                ),

                repostado: item.replies.some(
                    reply =>
                        reply.userId === userIdLogado &&
                        reply.conteudo !== null
                ),

                comentado: item.comments.some(
                    comment => comment.userId === userIdLogado
                ),

                // estouSeguindo = true/false
                estouSeguindo: idsSeguindo.includes(item.userId)
            }
        });

        return {
            ok: true,
            tweets: tweetsComJaSigo
        }
    }
}