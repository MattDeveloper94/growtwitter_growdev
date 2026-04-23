// -- TWEET

export interface CreateTweetDto {
    conteudo: string;
    userId: string;
}

export interface UpdateTweetDto {
    id: string
    conteudo?: string;
}