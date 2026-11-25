#!/bin/bash
# caddy-sync: apply validated Caddy config from the deployed repo copy (/home/website/thenewoil/caddy)
# to /etc/caddy when the VERSION comment in Caddyfile changes. Installs backups and rolls back
# automatically if validation, reload, or the post-reload health check fails.
# Runs from /etc/cron.d/caddy-sync (daily). Also safe to run manually.
set -u

REPO_DIR="/home/website/thenewoil/caddy"
LIVE_DIR="/etc/caddy"
LIVE_FILE="$LIVE_DIR/Caddyfile"
REPO_FILE="$REPO_DIR/Caddyfile"
MAX_BACKUPS=10

log() { logger -t caddy-sync "$*"; echo "[caddy-sync] $*"; }

[ -f "$REPO_FILE" ] || { log "repo Caddyfile missing; skipping"; exit 1; }
[ -f "$LIVE_FILE" ] || { log "live Caddyfile missing; refusing to bootstrap empty /etc/caddy"; exit 1; }

LIVE_VER=$(head -1 "$LIVE_FILE")
REPO_VER=$(head -1 "$REPO_FILE")

# Nothing changed since last run
[ "$LIVE_VER" = "$REPO_VER" ] && exit 0

LIVE_N=${LIVE_VER#*VERSION: }
REPO_N=${REPO_VER#*VERSION: }
case "$REPO_N" in ''|*[!0-9]*) log "cannot parse repo version '$REPO_VER'; skipping"; exit 1;; esac
case "$LIVE_N" in ''|*[!0-9]*) LIVE_N=0;; esac

# Repo is older than live: someone reverted GitHub; never roll back live config
if [ "$REPO_N" -lt "$LIVE_N" ]; then
	log "repo version ($REPO_N) older than live ($LIVE_N); skipping to avoid rollback"
	exit 1
fi

# Stage a full copy of the candidate config so validation sees a consistent set
STAGE=$(mktemp -d /tmp/caddy-sync.XXXXXX)
trap 'rm -rf "$STAGE"' EXIT
cp "$REPO_DIR"/*.caddy "$REPO_FILE" "$STAGE/"

if ! caddy validate --config "$STAGE/Caddyfile" >/dev/null 2>&1; then
	log "candidate config INVALID; keeping live config untouched"
	exit 1
fi

TS=$(date +%Y%m%d-%H%M%S)
mkdir -p "$LIVE_DIR/backup-$TS"
cp "$LIVE_FILE" "$LIVE_DIR"/*.caddy "$LIVE_DIR/backup-$TS/" 2>/dev/null

if ! install -m 644 -o root -g root "$STAGE"/*.caddy "$STAGE/Caddyfile" "$LIVE_DIR/"; then
	log "install failed; live config unchanged"
	exit 1
fi

if ! systemctl reload caddy; then
	log "reload FAILED; rolling back to backup-$TS"
	install -m 644 -o root -g root "$LIVE_DIR/backup-$TS"/*.caddy "$LIVE_DIR/backup-$TS/Caddyfile" "$LIVE_DIR/"
	systemctl reload caddy
	exit 1
fi

# Health check against the vhost on loopback; roll back if the site is broken
sleep 3
CODE=$(curl -s -o /dev/null -w '%{http_code}' --resolve thenewoil.org:443:127.0.0.1 https://thenewoil.org/en/ || true)
if [ "$CODE" != "200" ]; then
	log "health check failed (HTTP $CODE); rolling back to backup-$TS"
	install -m 644 -o root -g root "$LIVE_DIR/backup-$TS"/*.caddy "$LIVE_DIR/backup-$TS/Caddyfile" "$LIVE_DIR/"
	systemctl reload caddy
	exit 1
fi

# Keep only the newest MAX_BACKUPS backups
ls -1dt "$LIVE_DIR"/backup-* 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm -rf

log "deployed $REPO_VER successfully (backup: backup-$TS)"
exit 0
