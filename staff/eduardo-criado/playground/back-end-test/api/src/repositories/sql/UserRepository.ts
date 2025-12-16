import { prisma } from "../../database/prisma.js";

import { IUserData, IUserRepository } from "../types.js";

export class UserRepository implements IUserRepository {
  async create(user: IUserData): Promise<IUserData> {
    const created = await prisma.usuario.create({
      data: user,
    });
    return created as IUserData;
  }

  async get(id: string): Promise<IUserData> {
    const user = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }

    return user as IUserData;
  }

  async getAll(): Promise<IUserData[]> {
    const users = await prisma.usuario.findMany();
    return users as IUserData[];
  }

  async update(user: IUserData): Promise<IUserData> {
    const updated = await prisma.usuario.update({
      where: { id: user.id },
      data: user,
    });
    return updated as IUserData;
  }

  async delete(id: string): Promise<void> {
    await prisma.usuario.delete({
      where: { id },
    });
  }

  // Método adicional útil para validaciones
  async findByEmail(email: string): Promise<IUserData | null> {
    const user = await prisma.usuario.findUnique({
      where: { email },
    });
    return user as IUserData | null;
  }
}
