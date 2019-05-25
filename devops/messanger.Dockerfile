FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices /main/microservices
COPY ./server/config.js /main

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 6379
EXPOSE 7500
EXPOSE 9000

CMD ["node", "./microservices/messanger.js"]