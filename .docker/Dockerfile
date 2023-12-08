# STAGE 1: A container with pnpm and python3 is required
FROM node:20-alpine as pnpm_base

WORKDIR /app
# install pnpm
RUN npm i --global --no-update-notifier --no-fund pnpm@8.11.0
# install python3 and other deps
RUN apk add --no-cache g++ make py3-pip libc6-compat

# STAGE 2: fetch deps into the pnpm store
# We run pnpm fetch in a separate step to avoid re-fetching deps on every code change
# fetch is a pnpm command that downloads all dependencies to the local store
# You could remove or skip this step if using npm or yarn (but make sure to copy your lock file)
FROM pnpm_base as fetched_deps

WORKDIR /app
# setting production env usually speeds up install for your package manager
ENV NODE_ENV production
# copy the lock file that you use
COPY pnpm-lock.yaml ./
# set the store dir to a folder that is not in the project
RUN pnpm config set store-dir /workdir/.pnpm-store
RUN pnpm fetch

# STAGE 3: Copy the application code and install all deps from cache into the application
FROM fetched_deps as with_all_deps
# I use mono repo so I copy the whole project code (except for ignored things)
COPY . ./
# finally, install all the deps
RUN pnpm install --offline

# STAGE 4: Build the NextJS app
# Here we use pnpm filtering to only build the frontend app
# Then we use pnpm deploy command to prune the dependencies
FROM with_all_deps as builder
WORKDIR /app
RUN pnpm --filter='*' build 
RUN pnpm --filter='*' deploy pruned --prod

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app


# Rebuild the source code only when needed

ENV NEXT_TELEMETRY_DISABLED 1
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production


ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/pruned .
COPY --from=builder /app/public ./public

# Create output directory and set permissions
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]