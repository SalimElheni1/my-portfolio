#!/usr/bin/env bash
# Builds a release on this server, switches PM2 over to it, and rolls back
# if it doesn't answer. Run as the deploy user (not root):
#   /var/www/portfolio/deploy.sh [branch-or-tag]   (default: main)
# The clone is shallow and branch-based, so a commit SHA won't work here.
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
# Only a symlink to a release that still exists counts: readlink -f prints a
# path even when current is missing or points at a deleted release.
previous=""
if [ -L "$APP_DIR/current" ]; then
  previous=$(readlink -f "$APP_DIR/current" 2>/dev/null || true)
  [ -d "$previous" ] || previous=""
fi

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
SITE_URL=$(sed -n 's/^SITE_URL=//p' "$ENV_FILE" | tr -d "\"'" | tr -d '\r')
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

# Install the config and scripts with an atomic rename. Copying over
# deploy.sh while bash is still reading it would rewrite the file underneath
# the running script.
install_file() {
  install -m "$2" "deploy/$1" "$APP_DIR/$1.new"
  mv -f "$APP_DIR/$1.new" "$APP_DIR/$1"
}
# Kept so a rollback restarts the old release with the config it ran under.
if [ -f "$APP_DIR/ecosystem.config.cjs" ]; then
  cp -p "$APP_DIR/ecosystem.config.cjs" "$APP_DIR/ecosystem.config.cjs.prev"
fi
install_file ecosystem.config.cjs 644
install_file deploy.sh 755
install_file update-cloudflare-ips.sh 755

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
    if [ -f "$APP_DIR/ecosystem.config.cjs.prev" ]; then
      mv -f "$APP_DIR/ecosystem.config.cjs.prev" "$APP_DIR/ecosystem.config.cjs"
    fi
    switch_to "$previous"
    # The old release answering isn't a given; if it doesn't, the deploy failed
    # twice and that should be obvious in the output.
    if ! healthy; then
      echo "Rollback to $previous didn't answer either: check 'pm2 logs portfolio'." >&2
    fi
    # Removed only now, so the kept release slots go to builds that worked.
    rm -rf "$release"
  else
    echo "No previous release to roll back to: check 'pm2 logs portfolio'." >&2
    echo "Leaving $release in place to inspect." >&2
    # Nothing to roll back to, so the old config's copy is just a stale backup.
    rm -f "$APP_DIR/ecosystem.config.cjs.prev"
  fi
  exit 1
fi
pm2 save
rm -f "$APP_DIR/ecosystem.config.cjs.prev"

# Keep the newest few releases for quick rollbacks, and never the one that
# was live before this deploy, even if it's older. Done before the nginx
# check, since the release is live either way.
for old in $(ls -1 "$APP_DIR/releases" | sort -r | tail -n +$((KEEP_RELEASES + 1))); do
  [ "$APP_DIR/releases/$old" = "$previous" ] || rm -rf "${APP_DIR:?}/releases/$old"
done

# The app only matters if nginx is serving it. Port 80 answers with a redirect
# without the Cloudflare client certificate that the HTTPS vhost requires, so
# it's a cheap check that the vhost is loaded. It can't tell whether the
# loaded config is the latest one.
CHECK_HOST=$(printf '%s' "$SITE_URL" | sed -E 's#^https?://##; s#/.*$##')
nginx_status=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 5 \
  -H "Host: $CHECK_HOST" http://127.0.0.1/ || true)
if [ "$nginx_status" != "301" ]; then
  echo "Error: nginx did not answer for $CHECK_HOST (got '$nginx_status', expected 301)." >&2
  echo "$release is live in PM2, but run 'nginx -t' and check the vhost." >&2
  exit 1
fi
echo "Deployed $REF as $release."
