FROM node:10-alpine

WORKDIR /main
COPY ./server/gateway.js /main
COPY ./server/config.js /main

COPY ./server/package.json /main
COPY ./server/package-lock.json /main

RUN npm install

EXPOSE 5000

EXPOSE 80
EXPOSE 7100

CMD ["node", "gateway.js"]