import { UserRepository } from "./user.repository";
import { CreateUsuarioDto } from "./user.dto";

// camposobrigatorio guarda em si, uma lista onde pode conter apenas valores de propriedades do CreateUsuarioDto
const camposObrigatorios: (keyof CreateUsuarioDto)[] = [
    "nome",
    "username",
    "email",
    "senha",
    "dtNascimento"
];

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserService {
    // injeção de dependência | {corpo do construtor}
    constructor(private userRepository: UserRepository) { }

    async createUsuario(dados: CreateUsuarioDto) {

        // checando os campos
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

        return this.userRepository.criarUsuario(dados);
    }
}