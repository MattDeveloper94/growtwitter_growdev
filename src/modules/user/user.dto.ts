// -- USUÁRIO
export interface CreateUsuarioDto {
    nome: string;
    username: string;
    email: string;
    senha: string;
    dtNascimento: string;
    fotoPerfil?: string;
}

export interface UpdateUsuarioDto {
    nome?: string;
    username?: string;
    email?: string;
    senha?: string;
    dtNascimento?: string;
    fotoPerfil?: string;
}

export interface UploadFotoPerfilDto {
    fotoPerfil: string
}