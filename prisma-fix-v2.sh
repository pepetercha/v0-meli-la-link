	#!/bin/bash

PROJECT_DIR=~/v0-meli-la-link
ENV_FILE="$PROJECT_DIR/.env"
SCHEMA_FILE="$PROJECT_DIR/prisma/schema.prisma"
CONFIG_FILE="$PROJECT_DIR/prisma.config.js"

echo "🔍 Revisando entorno Prisma (v2)..."

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

# 3. Reescribir prisma.config.js en raíz del proyecto
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

echo "✅ Entorno Prisma corregido (v2). Ahora prueba:"
echo "cd $PROJECT_DIR && npx prisma migrate dev --name init"
