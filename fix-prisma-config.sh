#!/bin/bash

PROJECT_DIR=~/v0-meli-la-link
ENV_FILE="$PROJECT_DIR/.env"
SCHEMA_FILE="$PROJECT_DIR/prisma/schema.prisma"
CONFIG_FILE="$PROJECT_DIR/prisma.config.js"

echo "🔍 Verificando configuración de Prisma..."

# 1. Revisar .env
if ! grep -q "DATABASE_URL=" "$ENV_FILE"; then
  echo "⚠️ No se encontró DATABASE_URL en .env, agregando..."
  echo 'DATABASE_URL="postgresql://u0_a186:salmos83paraque@localhost:5432/mi_plataforma"' >> "$ENV_FILE"
fi

# 2. Revisar schema.prisma
if grep -q "url" "$SCHEMA_FILE"; then
  echo "⚠️ schema.prisma aún tiene 'url', eliminando..."
  sed -i '/url/d' "$SCHEMA_FILE"
fi

# 3. Revisar prisma.config.js
if ! grep -q "url:" "$CONFIG_FILE"; then
  echo "⚠️ prisma.config.js no tiene url, agregando..."
  cat > "$CONFIG_FILE" << 'EOF'
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
fi

echo "✅ Configuración corregida. Ahora prueba:"
echo "cd $PROJECT_DIR && npx prisma migrate dev --name init"
