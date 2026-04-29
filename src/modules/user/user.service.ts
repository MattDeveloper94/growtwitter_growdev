import { UserRepository } from "./user.repository";
import { CreateUsuarioDto, UploadFotoPerfilDto } from "./user.dto";

const userRepository = new UserRepository();
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // camposobrigatorio guarda em si, uma lista onde pode conter apenas valores de propriedades do CreateUsuarioDto
const camposObrigatorios: (keyof CreateUsuarioDto)[] = [
    "nome",
    "username",
    "email",
    "senha",
    "dtNascimento"
];

export class UserService {
    async createUsuario(dados: CreateUsuarioDto) {

        // // checando os campos
        for (const campo of camposObrigatorios) {
            //buscando o valor pela lista
            if (!dados[campo])
                throw new Error(`O campo ${campo} é obrigatório.`)

            if (dados[campo] === null || dados[campo] === "") {
                throw new Error(`O valor do campo ${campo} está vazio.`)
            }
        }

        const inicial = dados.nome.charAt(0).toUpperCase();

        if (!dados.fotoPerfil) {
            dados.fotoPerfil = `https://placehold.co/100x100?text=${inicial}`;
        }

        // validacao e-mail
        if (!emailValido.test(dados.email))
            throw new Error(`E-mail inválido.`)

        userRepository.criarUsuario(dados);

        // cria um novo objeto com os dados, removendo a senha
        const { senha, ...usuarioSemSenha } = dados;

        return {
            ok: true,
            usuario: usuarioSemSenha
        }
    }
}

export class FotoPerfilService {
    async uploadFotoPerfil(id: string, dado: UploadFotoPerfilDto) {

        if (!dado.fotoPerfil) {
            throw new Error("Informe uma foto de perfil.");
        }

        const fotoPerfil = await userRepository.uploadFotoPerfil(id, dado);

        return {
            ok: true,
            fotoPerfil: fotoPerfil
        }

    }
}