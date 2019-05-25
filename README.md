# CSc 667/867 Final Project

## The live app running as a docker swarm on EC2 instance on AWS:
http://ec2-18-222-137-26.us-east-2.compute.amazonaws.com/

## Dockerhub repos
https://cloud.docker.com/u/ikopyl/repository/list

### Authors
* Ilya Kopyl (ikopyl@mail.sfsu.edu)
* Joel Samaniego Campos (jsamani1@mail.sfsu.edu)
* Nick Besse (nbesse@mail.sfsu.edu)
* Kevin Truong (ktruong8@mail.sfsu.edu)

### Instructions

To download npm-dependencies for both front-end & back-end:

```bash
cd ./server && npm install
cd ..
cd ./client & npm install
cd ..
```

### Pre-requisites for back-end:

* have MongoDB up and running. If it was installed via homebrew, you could just run `mongod` in the terminal. If you feel fancy, you could instead run `brew services run mongodb`


#### To start the back-end

```bash
cd ./server && pm2 start process.config.js
```

#### To start the front-end

```bash
cd ./client && npm start
```

## How to test Docker containers:
```bash
cd devops && docker-compose pull && docker-compose up
```
- then open a browser and navigate to http://localhost
