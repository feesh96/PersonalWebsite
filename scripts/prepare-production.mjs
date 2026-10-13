import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../dist/personalWebsite/', import.meta.url));
const indexPath = path.join(root, 'index.html');
let html = readFileSync(indexPath, 'utf8');
for (const [name, extension, attribute] of [['styles', 'css', 'href'], ['script', 'js', 'src'], ['playback-state', 'js', 'src']]) {
  const content = readFileSync(path.join(root, `${name}.${extension}`));
  const digest = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const versionedName = `${name}.${digest}.${extension}`;
  const reference = new RegExp(`${attribute}="${name}(?:\\.[a-f0-9]+)?\\.${extension}"`);
  if (!reference.test(html)) throw new Error(`Missing ${name}.${extension} reference`);
  writeFileSync(path.join(root, versionedName), content);
  html = html.replace(reference, `${attribute}="${versionedName}"`);
}
writeFileSync(indexPath, html);
console.log('Prepared content-versioned production CSS and JavaScript.');
