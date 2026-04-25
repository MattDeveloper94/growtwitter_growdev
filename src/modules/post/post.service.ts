import { CreateTweetDto, UpdateTweetDto } from "./post.dto";
import { PostRepository } from "./post.repository";

const postRepository = new PostRepository();

export class PostService {
    async createTweet(dados: CreateTweetDto) {

        if (!dados.conteudo.trim())
            throw new Error(`O Tweet não pode estar vazio.`)

        if (dados.conteudo.length > 280)
            throw new Error('Você pode tweetar usando apenas 280 caracteres.')

        const tweetCriado = await postRepository.criarTweet(dados);

        return {
            ok: true,
            tweets: tweetCriado
        }
    }

    async updateTweet(id: string, dados: UpdateTweetDto) {
        const tweet = await postRepository.obterPorId(id);

        if (!tweet)
            throw new Error('Tweet não encontrado.')

        if (dados.conteudo !== undefined) {
            if (!dados.conteudo.trim())
                throw new Error("O tweet não pode estar vazio.")

            if (dados.conteudo.length > 280)
                throw new Error("Você pode tweetar usando apenas 280 caracteres.");
        }

        const tweetAtualizado = await postRepository.updateTweet(id, dados);

        return {
            ok: true,
            tweets: tweetAtualizado
        };
    }

    async deletarTweet(id: string, userId: string) {
        const tweet = await postRepository.obterPorId(id);

        if (!tweet)
            throw new Error('Tweet não encontrado.')

        if (tweet.userId != userId)
            throw new Error('Você não tem permissão para deletar esse tweet.')

        const tweetDeletado = await postRepository.deletarTweetPorId(id)

        return {
            ok: true,
            tweets: tweetDeletado
        };
    }
}