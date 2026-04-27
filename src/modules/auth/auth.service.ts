import { LoginUsuarioDto } from "./auth.dto"
import { UserRepository } from "../user/user.repository"
import jwt from "jsonwebtoken";

const userRepository = new UserRepository();
//validacao email
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthService {
  public async login(dados: LoginUsuarioDto) {

    let usuario;

    //verificando email ou username se existe
    if (!dados.email && !dados.username)
      throw new Error('Informe seu E-mail ou Username!')

    //verificando se senha existe
    if (!dados.senha)
      throw new Error('Digite sua senha!')

    //validando email
    if (dados.email && !emailValido.test(dados.email)) {
      throw new Error("E-mail inválido!");
    }

    //recebendo e-mail ou username
    if (dados.email) {
      usuario = await userRepository.obterPorEmail(dados.email)
    } else if (dados.username) {
      usuario = await userRepository.obterPorUsername(dados.username)
    }

    //verificando se usuario existe;
    if (!usuario)
      throw new Error('Usuário não existe!')

    //se usuario nao existe e senha foi digitada;
    if (!usuario && dados.senha)
      throw new Error('Login ou senha inválidos!')

    // verificando se a senha do usuário encontrado por e-mail ou username corresponde a senha informada. 
    if (usuario.senha !== dados.senha)
      throw new Error('Login ou senha inválidos!')

    //CRIANDO TOKEN - JWT
    const token = jwt.sign(
      { id: usuario.id },
      "segredo_jwt",
      { expiresIn: "1h" }
    );

    // cria um novo objeto com os dados do usuário, removendo a senha
    const { senha, ...usuarioSemSenha } = usuario;

    //saída
    return {
      ok: true,
      usuario: usuarioSemSenha,
      token
    }
  }
}