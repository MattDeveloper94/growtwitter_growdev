import { UserRepository } from "./user.repository";
import { CreateUsuarioDto } from "./user.dto";

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