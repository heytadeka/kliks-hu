#!/usr/bin/env bash
# Checks redirects, key URLs and SEO tags against a deployment. Ported from the kliks.com.au repo.
#
#   scripts/check-redirects.sh https://kliks.hu
#   VERCEL_BYPASS_SECRET=... scripts/check-redirects.sh https://<preview>.vercel.app
#   CURL=scripts/vercel-curl.sh scripts/check-redirects.sh https://<preview>.vercel.app   (protected preview via `vercel curl`)
#
# Exit code is the number of failed checks. Read-only: GET requests only.
# Redirects here are 308 because vercel.json uses cleanUrls and trailingSlash: false.

BASE="${1:-https://kliks.hu}"; BASE="${BASE%/}"
CURL="${CURL:-curl}"
HDR=()
[ -n "$VERCEL_BYPASS_SECRET" ] && HDR=(-H "x-vercel-protection-bypass: $VERCEL_BYPASS_SECRET")
fail=0; pass=0
ok()  { pass=$((pass+1)); printf 'PASS %s\n' "$*"; }
bad() { fail=$((fail+1)); printf 'FAIL %s\n' "$*"; }

# status, path, expected redirect path ("" when not a redirect)
check() {
  local want="$1" path="$2" loc="$3" out code got
  out=$($CURL -s -o /dev/null --max-redirs 0 "${HDR[@]}" -w '%{http_code} %{redirect_url}' "$BASE$path")
  code="${out%% *}"; got="${out#* }"; got="${got#http*://*/}"; got="/${got%%\?*}"; [ -z "${out#* }" ] && got=""
  if [ "$code" = "$want" ] && { [ -z "$loc" ] || [ "$got" = "$loc" ]; }; then ok "$path -> $code $got"
  else bad "$path -> got \"$out\", wanted $want $loc"; fi
}
# following the redirect must end on a 200, never a loop
lands() {
  local final
  final=$($CURL -s -o /dev/null -L --max-redirs 5 "${HDR[@]}" -w '%{http_code}' "$BASE$1")
  if [ "$final" = "200" ]; then ok "$1 follows to 200"; else bad "$1 follows to $final (loop or dead end)"; fi
}
# the response body must contain a fixed string
has() {
  if $CURL -s "${HDR[@]}" "$BASE$1" | grep -qF -- "$2"; then ok "$1 contains $2"; else bad "$1 is missing $2"; fi
}
# the response body must not contain a fixed string
hasnt() {
  if $CURL -s "${HDR[@]}" "$BASE$1" | grep -qF -- "$2"; then bad "$1 should not contain $2"; else ok "$1 does not contain $2"; fi
}

echo "== .html and trailing-slash URLs redirect to the clean URL"
for pair in "/index.html:/" "/index:/" "/foglalas.html:/foglalas" "/esettanulmanyok.html:/esettanulmanyok" \
            "/adatvedelem.html:/adatvedelem" "/koszonjuk.html:/koszonjuk" \
            "/foglalas/:/foglalas" "/esettanulmanyok/:/esettanulmanyok" "/adatvedelem/:/adatvedelem"; do
  check 308 "${pair%%:*}" "${pair#*:}"; lands "${pair%%:*}"
done

echo "== clean URLs and files stay 200 (no redirect loop)"
for p in / /foglalas /esettanulmanyok /adatvedelem /koszonjuk /sitemap.xml /robots.txt /consent.js /fonts/space-mono.css; do
  check 200 "$p" ""
done

echo "== real 404 status with the Hungarian page"
for p in /nincs-ilyen-oldal /aszf /kliks-adatvedelem-DRAFT; do check 404 "$p" ""; done

echo "== repo files are not published (only dist/ is served)"
for p in /scripts /scripts/build.mjs /scripts/fetch-fontshare.mjs /docs /docs/seo.md /vercel.json /.gitignore /adam-ads.gif /case-tapetabarlang.jpg; do check 404 "$p" ""; done
# with a trailing slash they redirect to the slashless URL first, which is a 404
for pair in "/scripts/:/scripts" "/docs/:/docs"; do check 308 "${pair%%:*}" "${pair#*:}"; done
for p in /img/case-tapetabarlang.jpg /img/founder.mp4 /fonts/fontshare.css /fonts/fontshare/satoshi-400.woff2; do check 200 "$p" ""; done
has /nincs-ilyen-oldal "Ez az oldal nem található"
has /nincs-ilyen-oldal '<meta name="robots" content="noindex">'

echo "== canonicals (apex) and noindex"
has /                 '<link rel="canonical" href="https://kliks.hu/">'
has /foglalas         '<link rel="canonical" href="https://kliks.hu/foglalas">'
has /esettanulmanyok  '<link rel="canonical" href="https://kliks.hu/esettanulmanyok">'
has /adatvedelem      '<link rel="canonical" href="https://kliks.hu/adatvedelem">'
has /koszonjuk        '<meta name="robots" content="noindex">'
for p in / /foglalas /esettanulmanyok /adatvedelem; do hasnt "$p" 'content="noindex"'; done

echo "== robots.txt and sitemap.xml"
has /robots.txt  'Sitemap: https://kliks.hu/sitemap.xml'
has /sitemap.xml '<loc>https://kliks.hu/</loc>'
hasnt /sitemap.xml 'koszonjuk'

echo; echo "passed: $pass   failed: $fail"; exit $fail
