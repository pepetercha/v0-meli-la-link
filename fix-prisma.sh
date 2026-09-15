#!/data/data/com.termux/files/usr/bin/bash

# Convertir prisma.config.ts a prisma.config.js
cat > prisma.config.js <<'EOF'
const { defineConfig } = require("@prisma/config");

module.exports = defineConfig({
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
EOF

# Eliminar archivo .ts si existe
rm -f prisma.config.ts

# Ejecutar Prisma
npx prisma generate
npx prisma migrate dev --name init
