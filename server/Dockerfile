FROM node:alpine

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .
COPY --chown=node:node .env.prod .env

EXPOSE 3000

CMD [ "npm", "start" ]
