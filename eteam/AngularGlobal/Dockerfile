FROM node:12.17.0-alpine AS build-step
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD ng serve --publicHost "feg.localhost" --disableHostCheck true
