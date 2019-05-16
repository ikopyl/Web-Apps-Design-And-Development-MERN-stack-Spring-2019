FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices/breweries.js /main/microservices
COPY ./server/config.js /main
COPY ./server/microservices/templates/ResponseTemplate.js /main/microservices/templates

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 7400

CMD ["node", "./microservices/breweries.js"]