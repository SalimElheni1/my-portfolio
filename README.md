# Salim Elhani — Portfolio

**I build software that solves real problems.**

Personal portfolio of [Salim Elhani](https://github.com/SalimElheni1), a Full-Stack JavaScript Developer based in Tunisia. Built as a small, honest, content-first site: one real shipped project as a full case study, factual experience, and no inflated claims.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss) ![Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)

**Live site:** not yet deployed — a custom domain is pending.

## Features

- **Custom design system** — Epilogue headlines, Hanken Grotesk body copy, JetBrains Mono metadata, and Reem Kufi for the Arabic text, on a near-black/off-white palette with a single burnt-orange accent. Dark by default, with a light theme one click away (`next-themes`): the choice is remembered, with no flash on load.
- **One real case study, told honestly** — [Quran Association Manager](https://github.com/SalimElheni1/quran-association-manager), an offline-first Electron app in daily production use, written up around its context, key decisions and their trade-offs, architecture, what went wrong, and how it was built (with AI coding agents, as product owner and technical lead). No placeholder or concept projects.
- **Working contact form** — a Next.js Route Handler (`app/api/contact`) backed by [Resend](https://resend.com), with server-side validation, a honeypot against basic spam, rate limits (5 messages per visitor per hour, 20 in total per day, counted in the server's memory; failed sends don't count), and a real success/error UI (never a fake success state) with a `mailto:` fallback.
- **Typed content layer** — most copy lives in `content/*.ts`, and a Vitest guard (`content/content.test.ts`) fails CI if stale or invented facts creep back into it or the home-page components.
- **Stays current on its own** — pages are prerendered, then refreshed at most once a day, so figures based on dates (years of experience, the footer year) move on without a redeploy.
- **Search and sharing** — sitemap, `robots.txt`, canonical links, Person structured data, and a link preview for every page; the case study gets its own preview image.
- **Accessible by default** — semantic landmarks, one `h1` per route, visible focus rings, a skip-to-content link, `aria-current` on active nav, and color pairs verified against WCAG AA in both themes.
- **Dockerized** — a multi-stage `Dockerfile` (small production image via Next.js `standalone` output) plus a `docker-compose.yml` dev environment with hot reload.

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Email | [Resend](https://resend.com) |
| Testing | [Vitest](https://vitest.dev) |
| Containers | Docker + Docker Compose |

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
| `SITE_URL` | Production | The site's public address, no trailing slash, used for canonical links, the sitemap, `robots.txt`, and social previews. Pages are prerendered at build time and refreshed once a day while the site runs, so set it in both places: your host's environment variables, or `--build-arg` for Docker, which also keeps it in the image. The build refuses to run without it; local dev falls back to `http://localhost:3000` |
| `RESEND_API_KEY` | Sending contact-form emails | Free at [resend.com](https://resend.com), 3,000 emails/month |
| `CONTACT_TO_EMAIL` | Overriding the delivery inbox | Resend's unverified/sandbox mode only delivers to the address the account is signed up with. Remove this once a domain is bought and verified in Resend — it then falls back to the public email in `content/profile.ts` |

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

## Docker

```bash
# Local development, with hot reload
docker compose up -d
docker compose logs -f
docker compose down

# Production image. SITE_URL is set at build time and kept for the server; .env files never enter the image.
docker build --target runner --build-arg SITE_URL=https://example.com -t my-portfolio:prod .
docker run -p 3000:3000 --env-file .env.local my-portfolio:prod
```

In production, put a reverse proxy such as nginx or Caddy in front of the container. The contact form's rate limit tells visitors apart by the address the proxy adds to `X-Forwarded-For`. Without a proxy, visitors can send a made-up address and get around the per-visitor limit.

## Project structure

```
app/
  page.tsx                        Homepage
  about/page.tsx                  About page
  work/quran-association-manager/ Project case study (static route — only one project exists)
  api/contact/route.ts            Contact form Route Handler
  opengraph-image.tsx             Link-preview image (About and the case study have their own routes)
  sitemap.ts, robots.ts           Sitemap and robots.txt
components/
  layout/         Header, footer
  home/           Homepage sections + the contact form
  work/           Case-study architecture diagram
  theme/          Dark/light theme provider + toggle
  section-heading.tsx
content/          Typed, factual copy (profile, experience, skills, project)
lib/              Site URL and page metadata, link-preview card, rate limiting, dates, class names
```

## Testing

```bash
npm test
```

Covers the experience-duration date helper, the contact-form rate limiter, and a content-integrity guard that fails if stale or invented content (wrong project names, unsupported claims) ever reappears in `content/`.

## Contact

- Email: [elheni.selim@gmail.com](mailto:elheni.selim@gmail.com)
- GitHub: [@SalimElheni1](https://github.com/SalimElheni1)
- LinkedIn: [salimelheni1](https://linkedin.com/in/salimelheni1)

---

© 2026 Salim Elhani. The code structure is free to reference; the personal content and case study are not licensed for reuse.
