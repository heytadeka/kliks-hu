#!/usr/bin/env node
// Builds dist/, the only folder Vercel serves (vercel.json outputDirectory).
// Copies an explicit allowlist of site files, so repo files such as scripts/,
// docs/, vercel.json and .gitignore are never published. No dependencies, Node 18+.
//
//   node scripts/build.mjs
//
// A new page or asset folder must be added to PAGES or DIRS below.

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');

const PAGES = ['index.html', 'esettanulmanyok.html', 'foglalas.html', 'koszonjuk.html', 'adatvedelem.html', '404.html'];
const FILES = ['consent.js', 'robots.txt', 'sitemap.xml'];
const DIRS = ['img', 'fonts'];

// Clash Display and Satoshi come from Fontshare at build time (never committed).
execFileSync(process.execPath, [join(ROOT, 'scripts', 'fetch-fontshare.mjs')], { stdio: 'inherit' });

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const f of [...PAGES, ...FILES, ...DIRS]) {
  if (!existsSync(join(ROOT, f))) throw new Error(`build: missing ${f}`);
  cpSync(join(ROOT, f), join(OUT, f), { recursive: true });
}
console.log(`build: copied ${PAGES.length} pages, ${FILES.join(', ')} and ${DIRS.map((d) => d + '/').join(', ')} to dist/`);
