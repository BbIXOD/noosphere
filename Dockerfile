FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json .
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/entrypoint.sh .

ENV NODE_ENV=production

CMD ["sh", "/app/entrypoint.sh"]
