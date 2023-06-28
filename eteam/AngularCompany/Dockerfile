FROM node:12.17.0-alpine AS build-step
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4201
CMD ng serve --publicHost "fec.localhost" --disableHostCheck true --port 4201
