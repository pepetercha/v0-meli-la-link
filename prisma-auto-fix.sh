#!/bin/bash

PROJECT_DIR=~/v0-meli-la-link
ENV_FILE="$PROJECT_DIR/.env"
SCHEMA_FILE="$PROJECT_DIR/prisma/schema.prisma"
CONFIG_FILE="$PROJECT_DIR/prisma.config.js"

echo "🔍 Iniciando revisión automática de Prisma..."

# 1. Revisar .env
if ! grep -q "DATABASE_URL=" "$ENV_FILE"; then
  echo "⚠️ No se encontró DATABASE_URL en .env, creando..."
  echo 'DATABASE_URL="postgresql://u0_a186:salmos83paraque@localhost:5432/mi_plataforma"' >> "$ENV_FILE"
fi
if ! grep -q "NEXTAUTH_SECRET=" "$ENV_FILE"; then
  echo "⚠️ No se encontró NEXTAUTH_SECRET en .env, creando..."
  echo 'NEXTAUTH_SECRET="clave-secreta"' >> "$ENV_FILE"
fi

# 2. Revisar schema.prisma
if grep -q "url" "$SCHEMA_FILE"; then
  echo "⚠️ schema.prisma aún tiene 'url', eliminando..."
  sed -i '/url/d' "$SCHEMA_FILE"
fi

# 3. Reescribir prisma.config.js en raíz con CommonJS
echo "⚠️ Reescribiendo prisma.config.js en raíz..."
cat > "$CONFIG_FILE" << 'EOF'
const { defineConfig } = require("@prisma/config");

module.exports = defineConfig({
  datasources: {
    db: {
      adapter: "postgresql",
      url: process.env.DATABASE_URL,
    },
  },
});
EOF

# 4. Ejecutar migración
echo "🚀 Ejecutando migración..."
cd $PROJECT_DIR
npx prisma migrate dev --name init

# 5. Verificar si migración falló
if [ $? -ne 0 ]; then
  echo "❌ Migración falló, intentando solución..."
  # Reintentar con prisma.config.ts usando import/export
  cat > "$PROJECT_DIR/prisma.config.ts" << 'EOF'
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasources: {
    db: {
      adapter: "postgresql",
      url: process.env.DATABASE_URL,
    },
  },
});
EOF

  echo "🔄 Reintentando migración con prisma.config.ts..."
  npx prisma migrate dev --name init
else
  echo "✅ Migración aplicada correctamente."
fi
