# Homework Assignment #3

### Authors
* Ilya Kopyl (ikopyl@mail.sfsu.edu)
* Joel Samaniego Campos (jsamani1@mail.sfsu.edu)
* Nick Besse (nbesse@mail.sfsu.edu)
* Kevin Truong (ktruong8@mail.sfsu.edu)

### Instructions

To download npm-dependencies for both front-end & back-end:

```bash
cd ./server && npm ci
cd ..
cd ./client & npm ci
cd ..
```

#### To start the back-end

```bash
cd ./server && pm2 start process.config.js
```

#### [TEMP] To start the deprecated monolithic back-end
```bash
cd ./server && node __deprecated__app.js
```


#### To start the front-end

```bash
cd ./client && npm start
```
