# ── STAGE 1: Build ──────────────────────────
FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ── STAGE 2: TEST ──────────────────────────
FROM base AS test
RUN npm run test -- --watch=false --browsers=ChromeHeadless

# ── STAGE 3: BUILD ──────────────────────────
FROM base AS builder
RUN npm run build -- --configuration production

# ── STAGE 4: PROD (NGINX) ──────────────────────────
FROM nginx:stable-alpine AS prod

RUN rm -rf /usr/share/nginx/html/*

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/angular-training/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]