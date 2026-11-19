#!/usr/bin/env node
// Regenerates sitemap.xml from the real page files. No dependencies, Node 18+.
// Ported from the kliks.com.au repo, adapted to kliks.hu.
//
//   node scripts/generate-sitemap.mjs           write sitemap.xml
//   node scripts/generate-sitemap.mjs --check   exit 1 if sitemap.xml is out of date
//
// A page is listed only when it has a self-referencing canonical and no noindex,
// so a page that is private, legacy or not ready simply stays out until it is
// given a canonical. Only files tracked by git are considered, so local drafts
// never end up in the sitemap. lastmod is the date of the file's last git
// commit, so commit your page changes first, then run this.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://kliks.hu';

const git = (...args) => execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8' }).trim();

const htmlFiles = git('ls-files', '*.html').split('\n').filter((f) => f && !f.includes('/'));

function pathFor(file) {
  if (file === 'index.html') return '/';
  return '/' + file.replace(/\.html$/, '');
}

function lastCommitDate(file) {
  try {
    const out = git('log', '-1', '--format=%cs', '--', file);
    if (out) return out;
  } catch { /* fall through */ }
  console.warn(`warning: no git history for ${file}, using today's date`);
  return new Date().toISOString().slice(0, 10);
}

const entries = [];
const skipped = [];
for (const file of htmlFiles) {
  const html = readFileSync(join(ROOT, file), 'utf8');
  const path = pathFor(file);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  if (noindex) { skipped.push(`${file} (noindex)`); continue; }
  if (!canonical) { skipped.push(`${file} (no canonical)`); continue; }
  if (canonical !== ORIGIN + path) { skipped.push(`${file} (canonical is ${canonical}, expected ${ORIGIN + path})`); continue; }
  entries.push([path, lastCommitDate(file)]);
}

entries.sort((a, b) => (a[0] === '/' ? -1 : b[0] === '/' ? 1 : a[0].localeCompare(b[0])));

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries.map(([p, d]) => `  <url>\n    <loc>${ORIGIN}${p}</loc>\n    <lastmod>${d}</lastmod>\n  </url>\n`).join('') +
  '</urlset>\n';

const target = join(ROOT, 'sitemap.xml');
if (process.argv.includes('--check')) {
  const current = existsSync(target) ? readFileSync(target, 'utf8') : '';
  if (current !== xml) { console.error('sitemap.xml is out of date. Run: node scripts/generate-sitemap.mjs'); process.exit(1); }
  console.log(`sitemap.xml is up to date (${entries.length} URLs)`);
} else {
  writeFileSync(target, xml);
  console.log(`wrote sitemap.xml with ${entries.length} URLs`);
  if (skipped.length) console.log('left out:\n  ' + skipped.join('\n  '));
}
