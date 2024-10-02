FROM node:20-alpine

WORKDIR  /tabelaincidentes

COPY package*.json  ./

RUN npm i

COPY . .

EXPOSE 3000