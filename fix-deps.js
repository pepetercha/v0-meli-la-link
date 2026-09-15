// fix-deps.js
import fs from "fs";
import { execSync } from "child_process";

const deps = [
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-context-menu",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-label",
  "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group",
  "@radix-ui/react-tooltip"
];

const pkgPath = "./package.json";
if (!fs.existsSync(pkgPath)) {
  console.error("❌ No existe package.json en la raíz del proyecto.");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

for (const dep of deps) {
  try {
    const version = execSync(`npm view ${dep} version`).toString().trim();
    if (pkg.dependencies && pkg.dependencies[dep]) {
      pkg.dependencies[dep] = version;
      console.log(`🔧 Corrigiendo ${dep} → ${version}`);
    }
  } catch {
    console.error(`⚠️ No se pudo obtener versión para ${dep}`);
  }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("✅ package.json corregido con versiones válidas.");

try {
  execSync("rm -rf node_modules package-lock.json");
  console.log("🗑️ Dependencias rotas eliminadas.");
} catch {}

try {
  execSync("npm install --legacy-peer-deps", { stdio: "inherit" });
  console.log("🚀 Dependencias reinstaladas correctamente.");
} catch (e) {
  console.error("❌ Error al reinstalar dependencias:", e.message);
}
