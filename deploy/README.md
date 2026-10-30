# Deploying to a VPS

The site runs as a single Node.js process under PM2, behind nginx, behind
Cloudflare, on one Ubuntu 24.04 server. No Docker.

```
visitor ──► Cloudflare ──► nginx :443 ──► Node 127.0.0.1:3000 (PM2, one fork)
                              │
                              └─► /_next/static, public/ served from disk
```

| File | Installed as |
|---|---|
| `deploy.sh` | `/var/www/portfolio/deploy.sh` (builds a release, switches over, rolls back if it doesn't answer) |
| `ecosystem.config.cjs` | `/var/www/portfolio/ecosystem.config.cjs` (copied by `deploy.sh`) |
| `portfolio.env.example` | `/etc/portfolio/portfolio.env` (secrets, mode 600) |
| `nginx/portfolio.conf` | `/etc/nginx/sites-available/portfolio` |
| `nginx/portfolio-proxy.conf` | `/etc/nginx/snippets/portfolio-proxy.conf` |
| `nginx/http-context.conf` | `/etc/nginx/conf.d/portfolio-http.conf` |
| `update-cloudflare-ips.sh` | writes `/etc/nginx/conf.d/cloudflare-realip.conf` |

## Why it's set up this way

- **Node listens on 127.0.0.1 only.** Reachable from outside, anyone could skip
  Cloudflare and nginx and send a made-up `X-Forwarded-For` to dodge the contact
  form's rate limit.
- **nginx trusts Cloudflare for the visitor's address** (`update-cloudflare-ips.sh`).
  Otherwise every visitor shares a handful of Cloudflare addresses, and the
  per-visitor limit treats them as one visitor.
- **One PM2 process, fork mode.** The rate limiter and ISR page cache live in
  memory; cluster mode would give each instance its own count.
- **`output: "standalone"`** means the server runs from `.next/standalone/server.js`
  with no `node_modules`. It idles around 85 MB.
- **`next build` peaks around 1.6 GB.** On a 2 GB VPS, keep a swapfile so a build
  can't push the OOM killer onto the live app. `deploy.sh` refuses to build
  without one when memory is short.

## One-time server setup

Run as root unless noted. Replace `salimelhani.tn` throughout if the domain differs.

1. **Deploy user, Node 24, PM2, nginx**

   ```bash
   adduser --disabled-password --gecos "" deploy
   ```

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y nodejs nginx git
   ```

   ```bash
   npm install -g pm2
   ```

2. **Swap** (skip if the VPS has 4 GB+ RAM)

   ```bash
   fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile && echo '/swapfile none swap sw 0 0' >> /etc/fstab
   ```

3. **Firewall:** only SSH and HTTPS in.

   ```bash
   ufw default deny incoming && ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable
   ```

4. **App directory and secrets**

   ```bash
   mkdir -p /var/www/portfolio /etc/portfolio && chown deploy:deploy /var/www/portfolio
   ```

   Copy `portfolio.env.example` to `/etc/portfolio/portfolio.env`, fill it in, then:

   ```bash
   chown deploy:deploy /etc/portfolio/portfolio.env && chmod 600 /etc/portfolio/portfolio.env
   ```

5. **Cloudflare**
   - SSL/TLS mode **Full (strict)**. Create an **Origin Certificate** and save it
     as `/etc/ssl/cloudflare/origin.pem` and `origin.key` (mode 600).
   - Turn on **Authenticated Origin Pulls** and save
     [Cloudflare's origin-pull CA](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/)
     as `/etc/ssl/cloudflare/authenticated_origin_pull_ca.pem`. nginx then
     refuses HTTPS requests that didn't come through Cloudflare.
   - **Cache rule:** bypass cache for `/api/*`. HTML may be cached ("Cache
     Everything" is safe: pages aren't personalised, and the theme lives in
     localStorage), as long as the query string stays in the cache key.
   - Optional: a **rate-limiting rule** on `/api/contact` (e.g. 5 requests per
     minute per IP). The app also allows only 20 messages a day in total, so a
     determined sender can still use them up; Turnstile on the form would be
     the next step if that happens.

6. **nginx**

   ```bash
   cp deploy/nginx/portfolio.conf /etc/nginx/sites-available/portfolio && ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default
   ```

   ```bash
   cp deploy/nginx/portfolio-proxy.conf /etc/nginx/snippets/ && cp deploy/nginx/http-context.conf /etc/nginx/conf.d/portfolio-http.conf
   ```

   ```bash
   bash deploy/update-cloudflare-ips.sh
   ```

   Refresh the Cloudflare list weekly (`crontab -e` as root):

   ```
   0 4 * * 1 /var/www/portfolio/update-cloudflare-ips.sh
   ```

7. **PM2 at boot, with log rotation** (as `deploy`, then the command it prints as root)

   ```bash
   pm2 startup systemd
   ```

   ```bash
   pm2 install pm2-logrotate
   ```

## Deploying

As `deploy`. The first time, run the script from a checkout; after that it's installed:

```bash
bash deploy/deploy.sh main
```

```bash
/var/www/portfolio/deploy.sh main
```

If the repository is private, give the `deploy` user a read-only GitHub deploy
key and run with `REPO=git@github.com:SalimElheni1/my-portfolio.git`.

Each run clones the ref, builds it with `SITE_URL` from the env file, copies
in `public/` and `.next/static`, points `current` at the new release, reloads
PM2, and checks `http://127.0.0.1:3000/`. If that doesn't answer within 15
seconds it switches back to the previous release and exits non-zero. The last
three releases are kept.

**Manual rollback**

```bash
ln -sfn /var/www/portfolio/releases/<timestamp> /var/www/portfolio/current && pm2 reload portfolio --update-env
```

**Logs**

```bash
pm2 logs portfolio
```

A restart takes about a second. With one process there's no zero-downtime
reload, and Cloudflare serves cached pages during it.

### Building elsewhere

To keep builds off the VPS entirely, build in CI with the same `SITE_URL`,
copy `public/` and `.next/static` into `.next/standalone` as `deploy.sh` does,
upload that folder to `/var/www/portfolio/releases/<timestamp>`, and point
`current` at it.
