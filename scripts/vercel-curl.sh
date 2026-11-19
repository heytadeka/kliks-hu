#!/usr/bin/env bash
# Lets check-redirects.sh reach a protected Vercel preview: takes curl's arguments
# (URL last) and runs them through `vercel curl`, which adds the protection bypass.
# CLI flags must come before the URL, or `vercel curl` hands them to curl.
#
#   CURL=scripts/vercel-curl.sh scripts/check-redirects.sh https://<preview>.vercel.app

url="${@: -1}"
args=("${@:1:$#-1}")
exec vercel curl --scope "${VERCEL_SCOPE:-adams-projects-fc0efc7d}" --yes "$url" -- "${args[@]}" 2>/dev/null
