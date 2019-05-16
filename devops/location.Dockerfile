FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices/location.js /main/microservices
COPY ./server/config.js /main
COPY ./server/microservices/templates/ResponseTemplate.js /main/microservices/templates

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 7200

CMD ["node", "./microservices/location.js"]