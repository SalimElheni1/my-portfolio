# Salim Elhani — Portfolio

**I build software that solves real problems.**

Personal portfolio of [Salim Elhani](https://github.com/SalimElheni1), a Full-Stack JavaScript Developer based in Tunisia. Built as a small, honest, content-first site: one real shipped project as a full case study, factual experience, and no inflated claims.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss) ![Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)

**Live site:** not yet deployed — a custom domain is pending.

## Features

- **Custom design system** — Epilogue headlines, Hanken Grotesk body copy, JetBrains Mono metadata, and Reem Kufi for the Arabic text, on a near-black/off-white palette with a single burnt-orange accent. Dark by default, with a light theme one click away (`next-themes`): the choice is remembered, with no flash on load.
- **One real case study, told honestly** — [Quran Association Manager](https://github.com/SalimElheni1/quran-association-manager), an offline-first Electron app in daily production use, written up around its context, key decisions and their trade-offs, architecture, what went wrong, and how it was built (with AI coding agents, as product owner and technical lead). No placeholder or concept projects.
- **Working contact form** — a Next.js Route Handler (`app/api/contact`) backed by [Resend](https://resend.com), with server-side validation shared with the form (`lib/contact.ts`), same-origin and JSON-only checks, a honeypot against basic spam, rate limits (5 messages per visitor per hour, 20 in total per day, counted in the server's memory; failed sends don't count), and a real success/error UI (never a fake success state) with a `mailto:` fallback.
- **Typed content layer** — most copy lives in `content/*.ts`, and a Vitest guard (`content/content.test.ts`) fails CI if stale or invented facts creep back into it or the home-page components.
- **Stays current on its own** — pages are prerendered, then refreshed at most once a day, so figures based on dates (years of experience, the footer year) move on without a redeploy.
- **Search and sharing** — sitemap, `robots.txt`, canonical links, Person structured data, and a link preview for every page; the case study gets its own preview image.
- **Accessible by default** — semantic landmarks, one `h1` per route, visible focus rings, a skip-to-content link, `aria-current` on active nav, and color pairs verified against WCAG AA in both themes.
- **Ready for a single VPS** — Next.js `standalone` output run by PM2 behind nginx and Cloudflare, security headers, and a deploy script that builds each release separately and rolls back if it doesn't come up (`deploy/`).

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Email | [Resend](https://resend.com) |
| Testing | [Vitest](https://vitest.dev) |
| Hosting | Ubuntu VPS: PM2, nginx, Cloudflare |

## Getting started

Requires Node.js 24+ and npm.

```bash
git clone git@github.com:SalimElheni1/my-portfolio.git
cd my-portfolio
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Set these in `.env.local` (never committed — see `.env.example`):

| Variable | Required for | Notes |
|---|---|---|
| `SITE_URL` | Production | The site's public address, no trailing slash, used for canonical links, the sitemap, `robots.txt`, and social previews. Pages are prerendered at build time and refreshed once a day while the site runs, so the build and the running server both need it (`deploy/deploy.sh` reads it from the server's env file for both). The build refuses to run without it; local dev falls back to `http://localhost:3000` |
| `RESEND_API_KEY` | Sending contact-form emails | Free at [resend.com](https://resend.com), 3,000 emails/month |
| `CONTACT_TO_EMAIL` | Choosing the delivery inbox | Defaults to the public email in `content/profile.ts`; set it to send contact-form notifications elsewhere |
| `CONTACT_FROM_EMAIL` | Sending from a different address | Defaults to the verified Resend sender `Portfolio <contact@mail.salimelhani.tn>`. In Resend's sandbox mode (no verified domain) set it to `onboarding@resend.dev`; sandbox also only delivers to the account's own address |
| `ALLOWED_DEV_ORIGINS` | Dev on other LAN devices | Comma-separated addresses (e.g. a phone at `192.168.1.20`) allowed to load the dev server |

Without `RESEND_API_KEY` set, the site still runs fine — the contact form fails gracefully with a clear error and a `mailto:` fallback instead of crashing or faking success.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run the Vitest suite |

## Deployment

Production runs on one Ubuntu VPS: Node under PM2 (one process, bound to `127.0.0.1`), nginx in front, Cloudflare in front of that. [`deploy/README.md`](deploy/README.md) has the server setup, nginx and PM2 configs, and the deploy script.

The contact form's rate limit tells visitors apart by the address nginx adds to `X-Forwarded-For`, so the app must only be reachable through nginx, and nginx must trust Cloudflare's addresses (`deploy/update-cloudflare-ips.sh`).

## Project structure

```
app/
  page.tsx                        Homepage
  about/page.tsx                  About page
  work/quran-association-manager/ Project case study (static route — only one project exists)
  api/contact/route.ts            Contact form Route Handler
  error.tsx, global-error.tsx     Error pages
  opengraph-image.tsx             Link-preview image (About and the case study have their own routes)
  sitemap.ts, robots.ts           Sitemap and robots.txt
components/
  layout/         Header, footer
  home/           Homepage sections + the contact form
  work/           Case-study architecture diagram
  theme/          Dark/light theme provider + toggle
  section-heading.tsx
content/          Typed, factual copy (profile, experience, skills, project)
lib/              Site URL and page metadata, contact-form rules, link-preview card, rate limiting, dates, class names
deploy/           PM2, nginx, and Cloudflare config, plus the deploy script
```

## Testing

```bash
npm test
```

Covers the experience-duration date helper, the contact-form rate limiter and email check, and a content-integrity guard that fails if stale or invented content (wrong project names, unsupported claims) ever reappears in `content/`.

## Contact

- Email: [elheni.selim@gmail.com](mailto:elheni.selim@gmail.com)
- GitHub: [@SalimElheni1](https://github.com/SalimElheni1)
- LinkedIn: [salimelheni1](https://linkedin.com/in/salimelheni1)

---

© 2026 Salim Elhani. The code structure is free to reference; the personal content and case study are not licensed for reuse.
