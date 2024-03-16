# Server Installation

These instructions are for use on a clean **Ubuntu 22.04** installation and should be run as **root**.

## Step 1. Basic Setup

1. Update:

```bash
apt update
apt full-upgrade
apt install sudo apt-transport-https curl git rsync
```

2. Firewall:

```bash
apt install ufw

# Port 22
ufw allow ssh
# Port 80
ufw allow http
# Port 443
ufw allow https

# List rules to confirm
ufw show added

# Enable firewall
ufw enable
```

3. Secure SSH in `/etc/ssh/sshd_config`:

```text
PasswordAuthentication no
```

(First add your SSH key to `~/.ssh/authorized_keys` of course.)

```bash
systemctl restart sshd
```

4. Update automatically: `apt install unattended-upgrades`

## Step 2. Webserver Install

1. [Install Caddy](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)

<details>
<summary>Why Caddy?</summary>

Trust me on this one. It's way easier to use than Nginx, and also plain better. Creating a website in Caddy is as simple as adding 4 lines to `/etc/caddy/Caddyfile`:

```text
example.com {
  root * /var/www/html
  file_server
}
```

Simply doing this creates the website, grabs an SSL certificate, and everything is configured with very sane/modern defaults (HTTP/2 and HTTP/3, automatic HTTPS redirects, [etc.](https://caddyserver.com/features)).

With Nginx, you'd have to at minimum configure `/etc/nginx/nginx.conf`, `/etc/nginx/sites-enabled/your-website.conf`, **and** install Certbot, set up your certificates and renewal jobs; and chances are it still won't be configured as good as it could be unless you've taken the time to tweak every Nginx setting. Boo.

</details>

## Step 3. Create User

1. `adduser --disabled-password website` (hit enter 6 times to accept all defaults) will create a user named `website` which will own these files.

2. Switch to this user: `su - website`

3. Clone this repo: `git clone https://github.com/tnonate/thenewoil`

At this point you should have this repository downloaded to `/home/website/thenewoil`. Switch back to the root user with `exit`.

## Step 4. Configure Webserver

1. **Replace** the contents of `/etc/caddy/Caddyfile` with:

```text
import /home/website/thenewoil/caddy/Caddyfile
```

2. Make user home directory listable: `chmod a+x /home/website`

This will make Caddy use the configuration files in the [`caddy`](../../caddy) folder in this repo. If you run other sites on this server you can add their configurations below the `import` line in `/etc/caddy/Caddyfile` (or you could add them to the `caddy` folder in this repo if that is easier).

## Step 5. Configure GitHub

1. Add a new repository variable on [this page](https://github.com/tnonate/thenewoil/settings/variables/actions) named `VPS_TARGET_DIR` with the value `/home/website/thenewoil/` (note the trailing slash)

2. Create an SSH key. Add the public key to `/home/website/.ssh/authorized_keys` on the server, add the private key as a new repository secret on [this page](https://github.com/tnonate/thenewoil/settings/secrets/actions) named `VPS_SSH_PRIVATE_KEY`.

3. Add a new repository secret on [this page](https://github.com/tnonate/thenewoil/settings/secrets/actions) named `VPS_HOST` with the value set to the IP address of the server.

## Step 6. Watch for webserver config changes

1. Create two files on the server:

`/etc/systemd/system/caddy-watcher.service`:

```systemd
[Unit]
Description=Caddy restarter
After=network.target
StartLimitIntervalSec=10
StartLimitBurst=5

[Service]
Type=oneshot
ExecStart=/usr/bin/systemctl reload caddy.service

[Install]
WantedBy=multi-user.target
```

`/etc/systemd/system/caddy-watcher.path`:

```systemd
[Path]
PathChanged=/home/website/thenewoil/caddy/Caddyfile

[Install]
WantedBy=multi-user.target
```

2. Run `systemctl daemon-reload`

3. Run `systemctl enable --now caddy-watcher.{path,service}`

## Step 7. Configure Hidden Service

1. [Install Tor](https://community.torproject.org/onion-services/setup/install/)

2. Add these lines to the top of `/etc/tor/torrc`:

```text
HiddenServiceDir /var/lib/tor/thenewoil/
HiddenServicePort 80 127.0.0.1:80
```

3. Restart Tor: `systemctl restart tor`

4. Get the onion address: `cat /var/lib/tor/thenewoil/hostname`

5. Replace the placeholders in the files in the [`caddy`](../../caddy) folder with this onion address. Remember to increment the version number in [`/caddy/Caddyfile`](../../caddy/Caddyfile) when making any changes to these files!
