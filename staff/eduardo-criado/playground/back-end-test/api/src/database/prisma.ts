import { PrismaClient } from "@prisma/client";

// Crear una única instancia del cliente Prisma
export const prisma = new PrismaClient();

// Función para cerrar la conexión (útil para tests)
export async function disconnect() {
  await prisma.$disconnect();
}
