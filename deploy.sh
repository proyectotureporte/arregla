#!/usr/bin/env bash
set -euo pipefail

readonly APP="arregla"
readonly APP_DIR="/var/www/${APP}"
readonly PORT="4006"
readonly NGINX_SITE="/etc/nginx/sites-available/${APP}"
readonly NGINX_ENABLED="/etc/nginx/sites-enabled/${APP}"

cd "${APP_DIR}"

npm ci
npm run typecheck
npm run build

pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

if [ ! -f "${NGINX_SITE}" ] || ! cmp -s deploy/nginx.conf "${NGINX_SITE}"; then
  if [ -f "${NGINX_SITE}" ]; then
    cp "${NGINX_SITE}" "${NGINX_SITE}.bak-$(date +%Y%m%d%H%M%S)"
  fi
  install -m 644 deploy/nginx.conf "${NGINX_SITE}"
  ln -sfn "${NGINX_SITE}" "${NGINX_ENABLED}"
  nginx -t
  systemctl reload nginx
fi

for attempt in 1 2 3 4 5; do
  if curl -fsS "http://127.0.0.1:${PORT}/api/health" >/dev/null; then
    printf 'Deploy OK: %s en puerto %s\n' "${APP}" "${PORT}"
    exit 0
  fi
  sleep 2
done

pm2 logs "${APP}" --lines 50 --nostream || true
printf 'Healthcheck falló para %s en puerto %s\n' "${APP}" "${PORT}" >&2
exit 1
