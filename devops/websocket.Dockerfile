FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices/websocket.js /main/microservices
COPY ./server/config.js /main

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 6000

CMD ["node", "./microservices/websocket.js"]