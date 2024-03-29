FROM alpine as build

WORKDIR /app

COPY package*.json ./
COPY index.js ./

RUN apk add curl nodejs npm --no-cache && \
    npm install --production && \
    curl -sf https://gobinaries.com/tj/node-prune | sh && \
    node-prune

FROM alpine

WORKDIR /app

RUN apk add nodejs npm --no-cache && \
    adduser -D node

USER node

COPY --from=build --chown=node:node /app/package.json ./ 
COPY --from=build --chown=node:node /app/index.js ./ 
COPY --from=build --chown=node:node /app/node_modules ./node_modules/

EXPOSE 4320

CMD ["npm", "start"]