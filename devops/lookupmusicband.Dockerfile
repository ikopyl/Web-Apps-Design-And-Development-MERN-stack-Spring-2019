FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices/lookupmusicband.js /main/microservices
COPY ./server/microservices/routes/lookupmusicbandRoutes.js /main/microservices/routes/
COPY ./server/microservices/models/lookupmusicbandModel.js /main/microservices/models/
COPY ./server/microservices/controllers/lookupmusicbandController.js /main/microservices/controllers/

COPY ./server/config.js /main
COPY ./server/microservices/templates/ResponseTemplate.js /main/microservices/templates

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 7100

CMD ["node", "./microservices/lookupmusicband.js"]