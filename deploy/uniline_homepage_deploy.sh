#!/usr/bin/env bash
set -euo pipefail

# Build and deploy uniline_homepage to a local static directory.
# Target path (per requirement): /dumsite/uniline_homepage/

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="${ROOT_DIR}/uniline_homepage"
DIST_DIR="${APP_DIR}/dist"
TARGET_DIR="/dumsite/uniline_homepage"

echo "[deploy] root: ${ROOT_DIR}"
echo "[deploy] app:  ${APP_DIR}"
echo "[deploy] dist: ${DIST_DIR}"
echo "[deploy] to:   ${TARGET_DIR}"

if [[ ! -d "${APP_DIR}" ]]; then
  echo "[deploy] ERROR: app directory not found: ${APP_DIR}" >&2
  exit 1
fi

cd "${APP_DIR}"

echo "[deploy] installing dependencies..."
if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

echo "[deploy] building..."
npm run build

if [[ ! -d "${DIST_DIR}" ]]; then
  echo "[deploy] ERROR: dist directory not found after build: ${DIST_DIR}" >&2
  exit 1
fi

echo "[deploy] syncing dist -> ${TARGET_DIR} ..."
mkdir -p "${TARGET_DIR}"

if command -v rsync >/dev/null 2>&1; then
  # Mirror dist content (delete removed files).
  rsync -a --delete "${DIST_DIR}/" "${TARGET_DIR}/"
else
  # Fallback: best-effort copy (won't delete stale files).
  cp -R "${DIST_DIR}/." "${TARGET_DIR}/"
fi

echo "[deploy] done."

