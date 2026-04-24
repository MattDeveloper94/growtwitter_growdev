import { FollowRepository } from "../follow/follow.repository";
import { prisma } from "../../database/prisma";
import { PostRepository } from "../post/post.repository";

const followRepository = new FollowRepository();
const postRepository = new PostRepository();

export class FeedService {
    public async timeLine(userIdLogado: string) {

        // quem eu sigo
        const seguindo = await followRepository.listarQuemEuSigo(userIdLogado);

        // pegar id
        const idsSeguindo = seguindo.map(item => item.followingId);

        // bucas tweets meus e de quem eu sigo
        const tweetsFolliwing = await prisma.tweet.findMany({
            where: {
                userId: {
                    in: [userIdLogado, ...idsSeguindo]
                }
            },
            include: {
                usuario: true
            },
            orderBy: {
                dtCriacao: "desc"
            }
        });

        return {
            ok: true,
            tweets: tweetsFolliwing
        };
    }

    public async explore(userIdLogado: string) {
        // quem eu sigo
        const seguindo = await followRepository.listarQuemEuSigo(userIdLogado);

        // pegar id
        const idsSeguindo = seguindo.map(item => item.followingId);

        // verificando se ja tenho na minha lista de seguidores o id de quem tem tweet no explore.html
        const tweetExplore = await postRepository.listarTweets()

        const tweetsComJaSigo = tweetExplore.map(item => {
            return {
                ...item,
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