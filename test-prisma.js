// test-prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear un usuario con links asociados
  const user = await prisma.user.create({
    data: {
      email: "osvaldo@example.com",
      name: "Osvaldo Vargas",
      links: {
        create: [
          { title: "Mi primer link" },
          { title: "Otro recurso importante" },
        ],
      },
    },
    include: { links: true },
  });

  console.log("✅ Usuario creado con links:", user);

  // Consultar todos los usuarios con sus links
  const users = await prisma.user.findMany({ include: { links: true } });
  console.log("📋 Usuarios en la base:", users);
}

main()
  .catch((e) => {
    console.error("❌ Error en Prisma:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
