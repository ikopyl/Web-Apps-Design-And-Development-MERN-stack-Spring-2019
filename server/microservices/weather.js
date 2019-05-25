const express = require('express');
const moment = require('moment');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const bodyParser = require('body-parser');

// const config = require('../config');
const {
  WEATHER_PORT,
  DB_URL,
  DB_NAME
} = require('../config');

const responseTemplate = require('./templates/ResponseTemplate');

//creating an app here as a microservice
const app = express();
app.use(bodyParser.json());

//creating a new MongoClient
const client = new MongoClient(DB_URL);

let db;

//you will need this method in each of your backends in order to establish a connection to the database and manage the async weirdness
const getConnection = (callback) => {
  if (db) return callback(db);
  client.connect((err) => {
    console.log('Connected successfully to server');
    db = client.db(DB_NAME);
    return callback(db);
  });
};
//helper method for adding objects to the database
//first parameter is the string name of the collection, second is an object {key:"value"}
const addToDatabase = (collection, addThisObject) => {
  getConnection((connection) => {
    connection.collection(collection).insertOne(addThisObject);
  });
};

//helper method for updating the first document that matches the first parameter
//first parameter is the string name of the collection, second is an object {findObjectWithThisValue:"value"}, third is an object {updatedOrNewKey:"value"}
const findAndUpdate = (collection, findThis, updateToThis) => {
  getConnection((connection) => {
    connection
      .collection(collection)
      .updateOne(findThis, { $set: updateToThis }, function(err, res) {
        if (err) throw err;
        console.log('1 document updated');
      });
  });
};

//helper method for updating all documents that match the first parameter
//first parameter is the string name of the collection, second is an object {findObjectWithThisValue:"value"}, third is an object {updatedOrNewKey:"value"}
const findAndUpdateMany = (collection, findThis, updateToThis) => {
  getConnection((connection) => {
    connection
      .collection(collection)
      .updateMany(findThis, { $set: updateToThis }, function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + ' document(s) updated');
      });
  });
};

//helper method for deleting the first documents that match the first parameter
//first parameter is the string name of the collection, the second is an object {findObjectWithThisValue:"value"}
const findAndDelete = (collection, findThis) => {
  getConnection((connection) => {
    connection.collection(collection).deleteOne(findThis, function(err, res) {
      if (err) throw err;
      console.log('1 document deleted');
    });
  });
};

//helper method for deleting the all documents that match the first parameter
//first parameter is the string name of the collection, the second is an object {findObjectWithThisValue:"value"}
const findAndDeleteMany = (collection, findThis) => {
  getConnection((connection) => {
    connection.collection(collection).deleteMany(findThis, function(err, res) {
      if (err) throw err;
      console.log(res.result.n + ' document(s) deleted');
    });
  });
};

//get location information
// A query parameter is expected,?format=json | jsonp | xml | csv | yaml
app.get('/weather/search', (req, res) => {
  const noQueryParams = Object.keys(req.query).length === 0;
  const noQueryParamsMsg = 'Invalid request: no query parameters';
  const unsupportedParametersMsg =
    "Invalid request: supported query parameters include '?lattlong='";

  //conditional check to verify that a supported parameter was included and not empty
  if (req.query.lattlong === undefined) {
    responseTemplate.response = unsupportedParametersMsg;
    res.status(400).json(responseTemplate);
  } else {
    //get woeid from API in order to make second request
    axios
      .get(
        'http://metaweather.com/api/location/search/?lattlong=' +
          req.query.lattlong
      )
      .then((res) => {
        console.log('latt long response: ' + res.data[0].woeid);
        console.log('request woeid: ', res.data[0].woeid);
        return axios.get(
          'http://metaweather.com/api/location/' + res.data[0].woeid
        );
      })
      .then((networkResponse) => {
        responseTemplate.data = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
        responseTemplate.description =
          'This endpoint provides weather information based on your lattitude and longitude. ' +
          "The required query parameter is 'lattlong " +
          'Example of use: ?lattlong=37.553800,-122.270000';
        responseTemplate.params = req.query;

        responseTemplate.response = noQueryParams
          ? noQueryParamsMsg
          : networkResponse.data;

        noQueryParams
          ? res.status(400).json(responseTemplate)
          : res.json(responseTemplate);
      })
      .catch((err) => {
        console.log(err);
        throw new Error();
        res.send('location request failed ' + err);
      });
  }
});

app.get('/weather', (req, res) => {
  const noQueryParams = Object.keys(req.query).length === 0;
  const noQueryParamsMsg = 'Invalid request: no query parameters';
  console.log('api reached', req.query);
  addToDatabase('searches', { searchCity: req.query });
  return axios
    .get('http://metaweather.com/api/location/search/?query=' + req.query.city)
    .then((res) => {
      console.log('city search response: ' + res.data[0].woeid);
      return axios.get(
        'http://metaweather.com/api/location/' + res.data[0].woeid
      );
    })
    .then((networkResponse) => {
      responseTemplate.data = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
      responseTemplate.description =
        'This endpoint provides weather information based on your City. ' +
        "The required query parameter is 'city " +
        'Example of use: ?city=london';
      responseTemplate.params = req.query;

      responseTemplate.response = noQueryParams
        ? noQueryParamsMsg
        : networkResponse.data;

      noQueryParams
        ? res.status(400).json(responseTemplate)
        : res.json(responseTemplate);
    })
    .catch((err) => {
      console.log(err);
      throw new Error();
      res.send('location request failed ' + err);
    });
});

app.listen(WEATHER_PORT, () => {
  console.log(`Microservice weather is listening on port ${WEATHER_PORT}`);
});
