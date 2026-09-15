const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "prisma", "schema.prisma");
const configPath = path.join(__dirname, "prisma.config.ts");
const rootSchemaPath = path.join(__dirname, "schema.prisma");

// 1. Eliminar schema.prisma duplicado en raíz
if (fs.existsSync(rootSchemaPath)) {
  fs.unlinkSync(rootSchemaPath);
  console.log("✅ Eliminado schema.prisma duplicado en raíz");
}

// 2. Revisar schema.prisma dentro de carpeta prisma
if (fs.existsSync(schemaPath)) {
  let schema = fs.readFileSync(schemaPath, "utf8");

  // Quitar cualquier línea con url dentro de datasource
  schema = schema.replace(/url\s*=.*\n/g, "");

  // Asegurar que datasource tenga provider
  if (!schema.includes("datasource db")) {
    schema += `\n\ndatasource db {\n  provider = "postgresql"\n}\n`;
  }

  fs.writeFileSync(schemaPath, schema, "utf8");
  console.log("✅ Corregido prisma/schema.prisma (sin url, con provider)");
}

// 3. Revisar prisma.config.ts
if (fs.existsSync(configPath)) {
  let config = fs.readFileSync(configPath, "utf8");

  if (!config.includes("datasources")) {
    config = `
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasources: {
    db: {
      provider: "postgresql",
      url: "postgresql://u0_a186:salmos83paraque@localhost:5432/mi_plataforma",
    },
  },
});
`;
    fs.writeFileSync(configPath, config, "utf8");
    console.log("✅ Corregido prisma.config.ts con URL de conexión");
  } else {
    console.log("ℹ️ prisma.config.ts ya tiene datasources, revisa que la URL sea correcta");
  }
}

console.log("🎉 Configuración Prisma revisada y corregida. Ahora corre:");
console.log("   npx prisma generate");
console.log("   npx prisma migrate dev --name init");
