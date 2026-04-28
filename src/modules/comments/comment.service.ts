import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";
import { CommentRepository } from "./comment.repository";

const commentRepository = new CommentRepository();

export class CommentService {

    async createComment(dados: CreateCommentDto) {

        dados.conteudo = dados.conteudo
            .trim()
            .split("\n")
            .map(linha => linha.trim())
            .join("\n")

        if (!dados.conteudo)
            throw new Error(`O comentario não pode estar vazio.`)

        if (dados.conteudo.length > 280)
            throw new Error('Você pode comentar usando apenas 280 caracteres.')

        const commentCriado = await commentRepository.criarComentario(dados);

        return {
            ok: true,
            comment: commentCriado
        }
    }

    async updateComment(id: string, userId: string, dados: UpdateCommentDto) {
        const comment = await commentRepository.obterPorId(id);

        if (!comment)
            throw new Error('Comentario não encontrado.')


        if (comment.userId != userId)
            throw new Error('Você não tem permissão para atualizar esse comentario.');

        if (dados.conteudo !== undefined) {

            dados.conteudo = dados.conteudo
                .trim()
                .split("\n")
                .map(linha => linha.trim())
                .join("\n");

            if (!dados.conteudo)
                throw new Error("O comentario não pode estar vazio.")

            if (dados.conteudo.length > 280)
                throw new Error("Você pode comentar usando apenas 280 caracteres.");
        }

        const commentUpdate = await commentRepository.updateComentario(id, dados);

        return {
            ok: true,
            comment: commentUpdate
        };
    }

    async deletarComment(id: string, userId: string) {
        const comment = await commentRepository.obterPorId(id);

        if (!comment)
            throw new Error('Comentario não encontrado.')

        if (comment.userId != userId)
            throw new Error('Você não tem permissão para deletar esse comentario.')

        const commentDelete = await commentRepository.deletarCommentPorId(id);

        return {
            ok: true,
            comment: commentDelete
        };
    }

    async listarCommentTweet(tweetId: string) {

        if (!tweetId)
            throw new Error('Tweet não encontrado.')

        const listarComment = await commentRepository.listarPorTweet(tweetId);

        return{
            ok: true,
            comments: listarComment
        };

    }
}