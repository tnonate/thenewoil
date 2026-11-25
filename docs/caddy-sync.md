# Caddy Config Sync (server: 203.161.43.240)

The server has a daily cron job that syncs Caddy config from the deployed repo copy to the live config:

- **Repo copy (deployed by GitHub Actions rsync):** `/home/website/thenewoil/caddy/`
- **Live config (read by caddy):** `/etc/caddy/`
- **Sync script:** `/usr/local/bin/caddy-sync.sh` (copied from `scripts/caddy-sync.sh` in this repo)
- **Cron entry:** `/etc/cron.d/caddy-sync` — runs daily at 04:30 UTC as root

## How it works

The script compares the `# VERSION:` comment on the first line of `Caddyfile` between the repo copy and live config. If they differ, it stages the full repo caddy config to a temp dir, validates it with `caddy validate`, backs up the current live config to `/etc/caddy/backup-<timestamp>/`, installs the new files, reloads caddy, and health-checks the site. If validation, reload, or the health check fails, it automatically restores from the backup.

This means: **editing any file in `/caddy/` must include bumping the `# VERSION:` number in `Caddyfile`** — that's what triggers the sync to actually apply. Without a version bump, the cron script treats the config as unchanged and skips it.

Backups are kept in `/etc/caddy/backup-<timestamp>/` directories, capped at the 10 most recent.

Logs go to the system journal tagged `caddy-sync` — check with `journalctl -t caddy-sync` or `grep caddy-sync /var/log/syslog`.

## Notes

- GitHub Actions' `deploy.yml` workflow deploys the site via rsync on every push to `main`. It does **not** touch `/etc/caddy/` — the cron script above is what applies Caddy config changes from the rsynced repo copy.
- The script refuses to "roll back" the live config if the repo version is *older* than live — so reverting a GitHub commit won't retroactively change the server config until you bump `# VERSION:` again. This protects against accidental downgrades.
