# build environment
FROM node:20.14.0-alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 5173

# RUN npm run dev