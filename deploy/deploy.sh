#!/usr/bin/env bash
# Builds a release on this server, switches PM2 over to it, and rolls back
# if it doesn't answer. Run as the deploy user (not root):
#   /var/www/portfolio/deploy.sh [git-ref]      (default: main)
#
# Layout:
#   /var/www/portfolio/releases/<timestamp>/   one self-contained build each
#   /var/www/portfolio/current -> releases/<timestamp>   what PM2 and nginx serve
set -euo pipefail

APP_DIR=${APP_DIR:-/var/www/portfolio}
ENV_FILE=${ENV_FILE:-/etc/portfolio/portfolio.env}
REPO=${REPO:-https://github.com/SalimElheni1/my-portfolio.git}
REF=${1:-main}
KEEP_RELEASES=${KEEP_RELEASES:-3}
HEALTH_URL=http://127.0.0.1:3000/

stamp=$(date -u +%Y%m%d%H%M%S)
release="$APP_DIR/releases/$stamp"
# Built outside releases/, so a half-finished build is never taken for a release.
src="$APP_DIR/build-$stamp"
previous=$(readlink -f "$APP_DIR/current" 2>/dev/null || true)

cleanup() { rm -rf "$src"; }
trap cleanup EXIT

# `next build` peaks around 1.6 GB. Without swap, building next to the live
# app on a 2 GB VPS can wake the OOM killer, which may pick the live app.
if [ "$(awk '/SwapTotal/ {print $2}' /proc/meminfo)" -eq 0 ] &&
   [ "$(awk '/MemAvailable/ {print $2}' /proc/meminfo)" -lt 2000000 ]; then
  echo "Less than 2 GB free and no swap: add a swapfile first (deploy/README.md)." >&2
  exit 1
fi

git clone --quiet --depth 1 --branch "$REF" "$REPO" "$src"
cd "$src"
npm ci --no-audit --no-fund

# Prerendered pages embed SITE_URL, so the build needs the server's value.
# Only that one variable: the build has no use for the secrets.
SITE_URL=$(sed -n 's/^SITE_URL=//p' "$ENV_FILE" | tr -d '"'"'"'')
if [ -z "$SITE_URL" ]; then
  echo "SITE_URL is missing from $ENV_FILE." >&2
  exit 1
fi
SITE_URL=$SITE_URL npm run build

# The standalone output leaves these out on purpose; server.js expects them here.
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
mkdir -p "$APP_DIR/releases"
mv .next/standalone "$release"
cp deploy/ecosystem.config.cjs deploy/deploy.sh deploy/update-cloudflare-ips.sh "$APP_DIR/"

switch_to() {
  ln -sfn "$1" "$APP_DIR/current.tmp"
  mv -Tf "$APP_DIR/current.tmp" "$APP_DIR/current"
  pm2 startOrReload "$APP_DIR/ecosystem.config.cjs" --update-env
}

healthy() {
  for _ in $(seq 1 15); do
    curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL" && return 0
    sleep 1
  done
  return 1
}

switch_to "$release"
if ! healthy; then
  echo "New release didn't answer on $HEALTH_URL." >&2
  if [ -n "$previous" ] && [ -d "$previous" ]; then
    echo "Rolling back to $previous." >&2
    switch_to "$previous"
  fi
  exit 1
fi
pm2 save

# Keep the newest few releases for quick rollbacks, and never the one that
# was live before this deploy, even if it's older.
for old in $(ls -1 "$APP_DIR/releases" | sort -r | tail -n +$((KEEP_RELEASES + 1))); do
  [ "$APP_DIR/releases/$old" = "$previous" ] || rm -rf "${APP_DIR:?}/releases/$old"
done
echo "Deployed $REF as $release."
