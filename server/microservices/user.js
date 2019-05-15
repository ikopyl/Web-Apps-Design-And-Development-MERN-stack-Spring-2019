const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config/config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Protect Routes
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.USER_PORT, () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(`${config.MONGODB_URI}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

const db = mongoose.connection;

db.once('open', () => {
  require('./routes/userRoutes')(server);
  console.log(`Server started on port ${config.USER_PORT}`);
});

db.on('connected', () => {
  console.log(`Mongoose connection was established on ${config.MONGODB_URI}`);
});

db.on('error', (err) => {
  console.log(`Unable to establish a mongoose connection due to ${err}`);
});

db.on('disconnected', () => {
  console.log(
    `Mongoose connection on ${config.MONGODB_URI} has been disconnected`
  );
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log(
      `Mongoose connection has been disconnected due to application termination`
    );
    process.exit(0);
  });
});
