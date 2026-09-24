import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const rootDir = path.resolve(__dirname, '../../');
const webPlatformDir = path.resolve(__dirname, '../../web_platform/react_app');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Sincronizar hacia la raíz del repositorio para GitHub Pages
copyRecursive(distDir, rootDir);

// 2. Crear 404.html y .nojekyll en la raíz
if (fs.existsSync(path.join(rootDir, 'index.html'))) {
  fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(rootDir, '404.html'));
}
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '# Disable Jekyll\n');

// 3. Sincronizar hacia web_platform/react_app y web_platform/audio
copyRecursive(distDir, webPlatformDir);
copyRecursive(path.resolve(__dirname, '../public/audio'), path.resolve(__dirname, '../../web_platform/audio'));
copyRecursive(path.resolve(__dirname, '../public/audio'), path.resolve(__dirname, '../../public/audio'));

console.log('✓ Build sincronizado automáticamente con la raíz del repositorio y web_platform/react_app');
