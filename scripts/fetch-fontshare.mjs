#!/usr/bin/env node
// Downloads Clash Display and Satoshi from Fontshare at build time and writes
// fonts/fontshare.css, so the site serves them itself and no visitor request goes
// to Fontshare. No dependencies, Node 18+.
//
// The ITF Free Font License allows self-hosting for your own website but not making
// the files available through a public repository, and this repository is public.
// So the font files are never committed (see .gitignore): Vercel runs this script
// as the build command and serves the result. Run it locally before previewing.
// Files are saved exactly as Fontshare serves them (no subsetting or conversion).

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'fonts', 'fontshare');
const FAMILIES = [
  ['clash-display', 'Clash Display', [400, 500, 600, 700]],
  ['satoshi', 'Satoshi', [400, 500, 700]],
];

mkdirSync(OUT, { recursive: true });
const faces = [];
for (const [slug, name, weights] of FAMILIES) {
  // one family per request: Fontshare can return a cached single-family answer otherwise
  const res = await fetch(`https://api.fontshare.com/v2/css?f[]=${slug}@${weights.join(',')}&display=swap`);
  if (!res.ok) throw new Error(`Fontshare CSS for ${slug}: HTTP ${res.status}`);
  const css = await res.text();
  for (const block of css.match(/@font-face\s*{[^}]*}/g) || []) {
    const weight = Number(block.match(/font-weight:\s*(\d+)/)?.[1]);
    const style = block.match(/font-style:\s*(\w+)/)?.[1] || 'normal';
    const woff2 = block.match(/url\('([^']+\.woff2)'\)/)?.[1];
    if (!weights.includes(weight) || style !== 'normal' || !woff2) continue;
    const file = `${slug}-${weight}.woff2`;
    const font = await fetch(woff2.startsWith('//') ? 'https:' + woff2 : woff2);
    if (!font.ok) throw new Error(`${file}: HTTP ${font.status}`);
    writeFileSync(join(OUT, file), Buffer.from(await font.arrayBuffer()));
    faces.push(`@font-face {\n  font-family: '${name}';\n  src: url(/fonts/fontshare/${file}) format('woff2');\n  font-weight: ${weight};\n  font-style: normal;\n  font-display: swap;\n}\n`);
  }
  const got = faces.filter((f) => f.includes(`'${name}'`)).length;
  if (got !== weights.length) throw new Error(`${name}: expected ${weights.length} weights, got ${got}`);
}

writeFileSync(join(ROOT, 'fonts', 'fontshare.css'),
  '/* Clash Display and Satoshi, ITF Free Font License (fontshare.com). Downloaded at build time, unmodified. */\n' + faces.join(''));
console.log(`fontshare: wrote ${faces.length} font faces to fonts/fontshare/`);
