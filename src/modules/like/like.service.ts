import { LikeRepository } from "./like.repository";

const likeRepository = new LikeRepository();

export class LikeService {
    // adicionar curtida
    public async criarLike(usuarioId: string, tweetId: string) {
        if (!usuarioId)
            throw new Error("Usuário logado não informado.");

        if (!tweetId)
            throw new Error("Tweet não informado.");

        const buscarLike = await likeRepository.buscarLike(usuarioId, tweetId);

        if (!buscarLike) {
            const likeCriado = await likeRepository.criarLike(usuarioId, tweetId);
            return {
                ok: true,
                likeCriado
            };
        }
    }

    // remover curtida
    public async deletarLike(usuarioId: string, tweetId: string) {
        if (!usuarioId)
            throw new Error("Usuário logado não informado.");

        if (!tweetId)
            throw new Error("Tweet não informado.");

        const buscarLike = await likeRepository.buscarLike(usuarioId, tweetId);
        if (buscarLike) {
            const likeDeletado = await likeRepository.deletarLike(usuarioId, tweetId);
            return {
                ok: true,
                likeDeletado
            };
        }
    }
}