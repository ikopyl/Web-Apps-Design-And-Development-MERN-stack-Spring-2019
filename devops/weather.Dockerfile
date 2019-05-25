FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices /main/microservices
COPY ./server/config.js /main

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 7300

CMD ["node", "./microservices/weather.js"]