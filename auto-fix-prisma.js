const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "prisma", "schema.prisma");
const configPath = path.join(__dirname, "prisma.config.ts");
const rootSchemaPath = path.join(__dirname, "schema.prisma");

function fixSchema() {
  if (fs.existsSync(rootSchemaPath)) {
    fs.unlinkSync(rootSchemaPath);
    console.log("✅ Eliminado schema.prisma duplicado en raíz");
  }

  if (fs.existsSync(schemaPath)) {
    let schema = fs.readFileSync(schemaPath, "utf8");
    schema = schema.replace(/url\s*=.*\n/g, ""); // quitar url si existe
    if (!schema.includes("datasource db")) {
      schema += `\n\ndatasource db {\n  provider = "postgresql"\n}\n`;
    }
    fs.writeFileSync(schemaPath, schema, "utf8");
    console.log("✅ Corregido prisma/schema.prisma");
  }
}

function fixConfig() {
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
      console.log("✅ Corregido prisma.config.ts con URL");
    }
  }
}

function runMigration() {
  try {
    console.log("🚀 Ejecutando prisma generate...");
    execSync("npx prisma generate", { stdio: "inherit" });

    console.log("🚀 Ejecutando prisma migrate dev...");
    execSync("npx prisma migrate dev --name init", { stdio: "inherit" });

    console.log("🎉 Migración aplicada correctamente");
  } catch (err) {
    console.error("❌ Error en migración, corrigiendo...");
    fixSchema();
    fixConfig();
    runMigration(); // reintenta hasta que funcione
  }
}

// Inicio
fixSchema();
fixConfig();
runMigration();
