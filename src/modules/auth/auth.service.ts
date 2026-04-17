import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  const token = jwt.sign(
    { sub: userId }, // dados dentro do token
    "segredo",       // chave secreta
    { expiresIn: "1d" } // tempo de expiração
  );

  return token;
}