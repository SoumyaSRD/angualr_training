# ── STAGE 1: Build ──────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# No --base-href here — Docker serves from root "/"
RUN npm run build -- --configuration production

# ── STAGE 2: Serve ──────────────────────────
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from Stage 1
COPY --from=builder /app/dist/angular-training/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
