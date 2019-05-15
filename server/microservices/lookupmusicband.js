/** @author Ilya Kopyl
 * @email ikopyl@mail.sfsu.edu */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/lookupmusicbandRoutes');

const app = express();
const PORT = process.env.LOOKUPMUSICBAND_PORT || 7100;

const DB_URL =
  process.env.LOOKUPMUSICBAND_DB_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.LOOKUPMUSICBAND_DB_NAME || 'lookupMusicBand';

mongoose.Promise = global.Promise;
mongoose.connect(`${DB_URL}/${DB_NAME}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection was established on ${DB_URL}/${DB_NAME}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Unable to establish a mongoose connection due to ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(
    `Mongoose connection on ${DB_URL}/${DB_NAME} has been disconnected`
  );
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      `Mongoose connection has been disconnected due to application termination`
    );
    process.exit(0);
  });
});

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const response =
    'This endpoint queries iTunes API and returns music metadata. </br>' +
    'Examples of supported APIs: </br>' +
    '/search?name=the beatles </br>' +
    '/search_results</br>' +
    '/search_result?name=the beatles </br>' +
    '/search_result/{search_result_id} </br>' +
    '/search_results/{search_result_id} </br>';
  res.end(response);
});

app.listen(PORT, () => {
  console.log(`Microservice lookupmusicband is listening on port ${PORT}`);
});
