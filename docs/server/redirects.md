# Redirects

Redirects can be added to [`/caddy/20-redirects.caddy`](../../caddy/20-redirects.caddy). This is useful not only for redirecting non-existent pages to other websites (like redirecting `/liberapay` to https://liberapay.com/thenewoil), but also for specifying one page normally accessible via multiple paths as the canonical page location.

For example, the homepage: Since all content including the homepage should be namespaced under a language-code folder, we need to redirect the index `/` path to one of these languages by default. We can add a `redir / /en` line to this file to do so.

See https://caddyserver.com/docs/caddyfile/directives/redir for file syntax information.

This behavior replaces the previous file aliasing approach, which was undesirable as it could lead to duplicate content issues.
