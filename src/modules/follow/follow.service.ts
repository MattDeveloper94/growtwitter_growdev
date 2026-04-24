import { FollowRepository } from "./follow.repository";

const followRepository = new FollowRepository();

export class FollowService {

    public async follow(followerId: string, followingId: string) {
        if (!followerId)
            throw new Error("Usuário logado não informado.");

        if (!followingId)
            throw new Error("Usuário que será seguido não informado.");

        if (followerId === followingId) {
            throw new Error("Você não pode seguir a si mesmo.");
        }

        const jaSegue = await followRepository.jaSigo(followerId, followingId);

        if (jaSegue)
            throw new Error("Você já segue esse usuário.");

        // follow
        const follow = await followRepository.criar(followerId, followingId);

        return {
            ok: true,
            follow
        };
    }

    public async Unfollow(followerId: string, followingId: string) {
        if (!followerId)
            throw new Error("Usuário logado não informado.");

        if (!followingId)
            throw new Error("Usuário a ser deixado de seguir não informado.");

        if (followerId === followingId) {
            throw new Error("Você não pode deixar de seguir a si mesmo.");
        }

        // follow
        const jaSegue = await followRepository.jaSigo(followerId, followingId);

        if (!jaSegue)
            throw new Error("Você não segue esse usuário.");

        // unfollow
        const unfollow = await followRepository.deletar(followerId, followingId);

        return {
            ok: true,
            unfollow
        }
    }
}