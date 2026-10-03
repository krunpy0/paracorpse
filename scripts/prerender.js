import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrDir = path.resolve(rootDir, 'dist-ssr');

async function prerender() {
  console.log('⚡ Building SSR bundle for pre-rendering...');
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
    },
    configFile: path.resolve(rootDir, 'vite.config.ts'),
  });

  const serverEntryPath = path.resolve(ssrDir, 'entry-server.js');
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  const { html: appHtml } = render();

  const templatePath = path.resolve(distDir, 'index.html');
  let template = await fs.readFile(templatePath, 'utf-8');

  // Inject rendered HTML into <div id="root"></div>
  const target = '<div id="root"></div>';
  if (template.includes(target)) {
    template = template.replace(target, `<div id="root">${appHtml}</div>`);
  } else {
    template = template.replace(/<div id="root"[^>]*>[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);
  }

  await fs.writeFile(templatePath, template, 'utf-8');
  console.log(`✅ Pre-rendered ${appHtml.length} characters of HTML into dist/index.html`);

  // Clean up temporary SSR folder
  await fs.rm(ssrDir, { recursive: true, force: true });
  console.log('🧹 Cleaned up temporary SSR directory');
}

prerender().catch((err) => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
