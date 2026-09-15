import fs from "fs";
import path from "path";

// 1. Verificar que .env existe
const envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.error("❌ No existe el archivo .env. Créalo en la raíz del proyecto.");
  process.exit(1);
}

// 2. Cargar DATABASE_URL
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("❌ No se encontró DATABASE_URL en .env");
  process.exit(1);
}

console.log("✅ DATABASE_URL detectado:", process.env.DATABASE_URL);

// 3. Verificar prisma.config.ts
const prismaConfigPath = path.resolve(process.cwd(), "prisma/prisma.config.ts");
if (!fs.existsSync(prismaConfigPath)) {
  console.error("❌ No existe prisma/prisma.config.ts. Creando archivo...");
  fs.mkdirSync(path.resolve(process.cwd(), "prisma"), { recursive: true });
  fs.writeFileSync(
    prismaConfigPath,
    `import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      adapter: "postgresql",
      url: process.env.DATABASE_URL,
    },
  },
});`
  );
  console.log("✅ prisma.config.ts creado automáticamente.");
} else {
  console.log("✅ prisma.config.ts encontrado.");
}

// 4. Verificar schema.prisma
const schemaPath = path.resolve(process.cwd(), "prisma/schema.prisma");
if (!fs.existsSync(schemaPath)) {
  console.error("❌ No existe prisma/schema.prisma. Debes crear tu esquema.");
} else {
  console.log("✅ schema.prisma encontrado.");
}

console.log("🚀 Todo listo. Ahora prueba con: npx prisma migrate dev --name init_users_links");
