FROM node:12.17.0-alpine AS build-step
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4203
CMD ng serve --publicHost "fe.localhost" --disableHostCheck true
