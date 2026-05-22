FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:22-alpine AS production
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-eng
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public
RUN mkdir -p /data uploads

ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/album.db
ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
