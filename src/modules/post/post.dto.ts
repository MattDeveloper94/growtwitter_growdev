// -- TWEET

export interface CreateTweetDto {
    conteudo: string;
    userId: string;
    replyId?: string;
    fotoTweet?: string;
}

export interface UpdateTweetDto {
    id: string
    conteudo?: string;
    fotoTweet?: string;
}