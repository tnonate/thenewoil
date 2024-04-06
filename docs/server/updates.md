# Server Updates

## Caddy Updates

After installing a customized build of Caddy `apt` will no longer give you Caddy updates, unfortunately. To update caddy, you can run [`caddy upgrade`](https://caddyserver.com/docs/command-line#caddy-upgrade):

```
caddy upgrade
systemctl restart caddy
```

Alternatively (i.e. if that doesn't work) you can download a [pre-built copy of Caddy](https://github.com/jonaharagon/caddy-build/releases/latest) which includes the modules you have installed:

```
wget https://github.com/jonaharagon/caddy-build/releases/latest/download/caddy-linux-amd64
chmod +x caddy-linux-arm64
sudo mv ./caddy-linux-arm64 /usr/bin/caddy.custom
caddy validate --config /etc/caddy/Caddyfile
systemctl restart caddy
```
