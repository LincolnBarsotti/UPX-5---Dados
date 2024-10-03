FROM node:20-alpine

WORKDIR  /tabelaincidentes

COPY package*.json  ./

RUN npm i

COPY . .

ENTRYPOINT [ "node", "data/script2.js" ]

EXPOSE 3000