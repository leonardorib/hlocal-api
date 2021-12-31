FROM node:16.13.0

WORKDIR /home/app/hlocal-api

COPY package.json package-lock.json ormconfig.js nest-cli.json tsconfig.json tsconfig.build.json ./

RUN npm install