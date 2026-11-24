#!/usr/bin/env bash
# Örnek çalışma ekran görüntülerini üretir: public/ornekler/{slug}.png
# Kullanım: dev sunucusu açıkken  bash scripts/demo-screenshots.sh [base_url]
set -euo pipefail

BASE="${1:-http://localhost:3000}"
EDGE="${EDGE:-/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe}"
OUT="public/ornekler"
mkdir -p "$OUT"

slugs=$(grep -o 'slug: "[^"]*"' src/lib/demos.ts | cut -d'"' -f2)
for slug in $slugs; do
  # Sayfayı önce derlet; headless'in sanal zaman bütçesi ilk derlemeye yetmeyebilir.
  curl -s -o /dev/null --max-time 120 "$BASE/demo/$slug"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 \
    --virtual-time-budget=5000 --screenshot="$(cygpath -w "$PWD/$OUT/$slug.png" 2>/dev/null || echo "$PWD/$OUT/$slug.png")" \
    "$BASE/demo/$slug" 2>/dev/null
  echo "ok $slug"
done
