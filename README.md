# Homework Assignment #3

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
