// -- USUÁRIO
export interface CreateUsuarioDto {
    nome: string;
    email: string;
    senha: string;
    dtNascimento: string;
    fotoPerfil?: string;
}

export interface UpdateUsuarioDto {
    nome?: string;
    email?: string;
    senha?: string;
    dtNascimento?: string;
    fotoPerfil?: string;
}