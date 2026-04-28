export interface CreateCommentDto{
    conteudo: string;
    userId: string;
    tweetId: string;
}

export interface UpdateCommentDto{
    id: string;
    conteudo?: string;
}