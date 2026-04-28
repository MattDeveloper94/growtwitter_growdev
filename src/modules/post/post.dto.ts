// -- TWEET

export interface CreateTweetDto {
    conteudo: string;
    userId: string;
    replyId?: string;
}

export interface UpdateTweetDto {
    id: string
    conteudo?: string;
}