FROM node:20-alpine

FROM jupyter/base-notebook:latest

WORKDIR  /tabelaincidentes

COPY package*.json  ./

RUN npm i
RUN pip install openpyxl pandas
 

COPY . .

ENTRYPOINT [ "node", "data/script2.js" ]

EXPOSE 3000