FROM node:16 as build-stage
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV npm_config_cache /home/node/app/.npm

WORKDIR /usr/src/app/birdnest-frontend

RUN npm ci

WORKDIR /usr/src/app/birdnest-backend

RUN npm ci

RUN npm run build:full

FROM node:16 AS run-stage

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/birdnest-backend .

USER node

CMD npm start
