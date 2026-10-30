// PM2 process file. deploy.sh copies it to /var/www/portfolio and runs
// `pm2 startOrReload` on it; see deploy/README.md.
module.exports = {
  apps: [
    {
      name: "portfolio",
      // A symlink to the live release's standalone output (server.js,
      // .next/static, public). Each (re)start resolves it afresh.
      cwd: "/var/www/portfolio/current",
      script: "server.js",
      // One forked process, never cluster mode: the contact form's rate
      // limits and the ISR page cache live in this process's memory, so
      // several instances would each count separately.
      exec_mode: "fork",
      instances: 1,
      // Secrets (RESEND_API_KEY, CONTACT_TO_EMAIL) and SITE_URL come from a
      // file outside the repo, readable only by the deploy user. Node refuses
      // to start if it's missing, rather than run half-configured.
      node_args: "--max-old-space-size=256 --env-file=/etc/portfolio/portfolio.env",
      // The app idles around 85 MB; restart well before the VPS runs short.
      max_memory_restart: "350M",
      // Back off instead of spinning if it keeps crashing on start.
      exp_backoff_restart_delay: 200,
      kill_timeout: 5000,
      env: {
        NODE_ENV: "production",
        // Only nginx may reach the app. Bound to every interface, anyone
        // could skip nginx and Cloudflare and fake X-Forwarded-For to get
        // around the contact form's rate limit.
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
