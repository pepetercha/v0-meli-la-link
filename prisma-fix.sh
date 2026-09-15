#!/bin/bash

PROJECT_DIR=~/v0-meli-la-link
ENV_FILE="$PROJECT_DIR/.env"
SCHEMA_FILE="$PROJECT_DIR/prisma/schema.prisma"
CONFIG_FILE="$PROJECT_DIR/prisma.config.js"

echo "🔍 Revisando entorno Prisma..."

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

# Asegurar que tenga modelos básicos
if ! grep -q "model User" "$SCHEMA_FILE"; then
  echo "⚠️ schema.prisma no tiene modelos, agregando User y Link..."
  cat >> "$SCHEMA_FILE" << 'EOF'

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  links     Link[]
}

model Link {
  id     Int    @id @default(autoincrement())
  url    String
  title  String?
  userId Int
  user   User   @relation(fields: [userId], references: [id])
}
EOF
fi

# 3. Revisar prisma.config.js
if ! grep -q "url:" "$CONFIG_FILE"; then
  echo "⚠️ prisma.config.js no tiene url, creando..."
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

echo "✅ Entorno Prisma corregido. Ahora prueba:"
echo "cd $PROJECT_DIR && npx prisma migrate dev --name init"
