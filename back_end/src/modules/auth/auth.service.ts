import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma";

export const authService = {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return { error: "Usuário não encontrado" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Senha inválida" };

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    });

    return { token };
  }
};
