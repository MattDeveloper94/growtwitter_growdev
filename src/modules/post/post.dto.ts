// -- TWEET

export interface CreateTweetDto {
    conteudo: string;
    userId: string;
}

export interface UpdateTweetDto {
    conteudo: string;
    userId?: string;
}