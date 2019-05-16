FROM node:10-alpine

WORKDIR /main
COPY ./server/microservices/user.js ./main/microservices
COPY ./server/microservices/routes/userRoutes.js ./main/microservices/routes
COPY ./server/microservices/models/userModel.js ./main/microservices/models

COPY ./server/config.js ./main

COPY ./server/package.json ./main
COPY ./server/package-lock.json ./main

RUN npm install

EXPOSE 8000

CMD ["node", "./microservices/user.js"]