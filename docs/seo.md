# SEO notes (kliks.hu)

**Sitemap.** `sitemap.xml` is generated. After changing or adding a page, commit the page first (each URL's `lastmod` is the file's last commit date), then run:

```bash
node scripts/generate-sitemap.mjs
```

`node scripts/generate-sitemap.mjs --check` exits 1 if the committed sitemap is stale. A page is listed only if it is tracked by git, has a self-referencing canonical on `https://kliks.hu`, and has no `noindex`. `/koszonjuk` and `404.html` are `noindex` on purpose.

**Canonical host.** Canonicals, `og:url`, JSON-LD and the sitemap all use the apex `https://kliks.hu`. The live domain setting still redirects the apex to `www` with a 307; flip it in the Vercel dashboard (Domains: make `kliks.hu` primary, `www.kliks.hu` redirect to it with 308). Do not add a host redirect in `vercel.json`, or it will loop against the domain setting.

**Checks.** `scripts/check-redirects.sh <base-url>` tests the `.html` and trailing-slash redirects (308, from `cleanUrls`), that clean URLs, `robots.txt` and `sitemap.xml` return 200, the custom 404, canonicals and `noindex`. For a protected preview, run it through `vercel curl`:

```bash
CURL=scripts/vercel-curl.sh scripts/check-redirects.sh https://<preview>.vercel.app
```

**Fonts.** Space Mono is self-hosted in `fonts/` (SIL OFL 1.1, licence included). Clash Display and Satoshi are downloaded from Fontshare at build time (`scripts/fetch-fontshare.mjs`) and served from `/fonts/fontshare/`; they are gitignored because the ITF Free Font License allows self-hosting but not making the files available through a public repository, and this repository is public.

**Build.** Vercel runs `node scripts/build.mjs`, which fetches the Fontshare fonts and copies an explicit allowlist into `dist/`, the only folder served: the six pages (`index`, `esettanulmanyok`, `foglalas`, `koszonjuk`, `adatvedelem`, `404`), `consent.js`, `robots.txt`, `sitemap.xml`, `img/` and `fonts/`. Repo files (`scripts/`, `docs/`, `vercel.json`, `.gitignore`) are not published. A new page or asset folder has to be added to the lists in `scripts/build.mjs`.
