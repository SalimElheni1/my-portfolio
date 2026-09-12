# syntax=docker/dockerfile:1

# ---- base ----
# Shared starting point for every other stage: same Node version everywhere,
# so "works in one stage" always means "works in all of them."
#
# Using the Debian-based "slim" image, not Alpine: Alpine uses musl libc
# instead of glibc, and native dependencies (here, `sharp`, which Next.js
# uses for image optimization) resolve different platform-specific
# packages for each. Our package-lock.json was generated on a glibc
# machine, so it's missing the musl variants -- `npm ci` fails inside
# Alpine with "Missing: @emnapi/... from lock file". Slim avoids this
# whole class of problem at the cost of a slightly larger image.
FROM node:24-slim AS base
WORKDIR /app

# ---- deps ----
# Installs dependencies in their own stage/layer. Docker caches each
# instruction as a "layer": as long as package.json / package-lock.json
# don't change, Docker reuses this layer on the next build instead of
# re-running npm install — this is why COPY package*.json happens before
# COPY of the rest of the source.
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ----
# Has the full source + full node_modules (including devDependencies,
# needed to run `next build`). Produces .next/standalone.
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner (production) ----
# The image you'd actually deploy. Alpine + only the standalone output:
# no devDependencies, no full node_modules, no source files, no build tools.
FROM base AS runner
ENV NODE_ENV=production

# Next.js's standalone server doesn't need to (and shouldn't) run as root.
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# .next/standalone has the server + a pruned node_modules, but NOT the
# static assets or public/ folder — Next.js expects those copied in
# separately, at these exact paths.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]

# ---- dev ----
# Used by docker-compose for local development: full node_modules
# (including devDependencies), runs `next dev`, and relies on the compose
# file bind-mounting the source code so edits on your machine show up
# immediately without rebuilding the image.
FROM base AS dev
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
