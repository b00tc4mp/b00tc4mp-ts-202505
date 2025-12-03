import { prisma } from "../database/prisma.js";
import { randomUUID } from "crypto";

async function seed() {
  try {
    console.log("🌱 Sembrando datos de prueba...");

    // Crear usuarios de prueba
    const usuario1 = await prisma.usuario.create({
      data: {
        id: randomUUID(),
        nombre: "Juan Pérez",
        email: "juan@example.com",
        tipo_permiso: "B", // Permiso de coche
        permiso_valido_hasta: new Date("2026-12-31"), // Válido
      },
    });
    console.log("✅ Usuario 1 creado:", usuario1);

    const usuario2 = await prisma.usuario.create({
      data: {
        id: randomUUID(),
        nombre: "María García",
        email: "maria@example.com",
        tipo_permiso: "A", // Permiso de moto
        permiso_valido_hasta: new Date("2025-06-30"), // Válido
      },
    });
    console.log("✅ Usuario 2 creado:", usuario2);

    const usuario3 = await prisma.usuario.create({
      data: {
        id: randomUUID(),
        nombre: "Pedro López",
        email: "pedro@example.com",
        tipo_permiso: "B", // Permiso de coche
        permiso_valido_hasta: new Date("2027-01-01"), // Válido
      },
    });
    console.log("✅ Usuario 3 creado (permiso valido):", usuario3);

    console.log("\n📋 IDs para usar en las pruebas:");
    console.log(`   Usuario 1 (Juan - Permiso B válido): ${usuario1.id}`);
    console.log(`   Usuario 2 (María - Permiso A válido): ${usuario2.id}`);
    console.log(`   Usuario 3 (Pedro - Permiso B valido): ${usuario3.id}`);

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed();
