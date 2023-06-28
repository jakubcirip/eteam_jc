FROM node:12.17.0-alpine AS build-step
WORKDIR /app
COPY package.json ./
RUN apk add g++ make python
RUN npm install
RUN npm install -g typescript ts-node nodemon
EXPOSE 3000
CMD yarn dev:api
