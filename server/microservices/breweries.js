const express = require('express');
const moment = require('moment');
const axios = require('axios');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const responseTemplate = require('./templates/ResponseTemplate');
const config = require('../config');

const PORT = config.BREWERIES_PORT;   // 7400
const DB_URL = config.DB_URL;         // mongodb://localhost:27017
const DB_NAME = config.DB_NAME;       // finalProject

//creating a new MongoClient
const client = new MongoClient(DB_URL);

const app = express();
app.use(bodyParser.json());

// you will need this method in each of your backends in order to establish a connection to the database and manage the async weirdness
client.connect((err) => {
  try {
    console.log('Connected successfully to server');
    const db = client.db(DB_NAME);
  } catch {
    console.log('error, database not connected');
  }

  //method to add to Database
  const addToDatabase = (collection, addThisObject) => {
    db.collection(collection).insertOne(addThisObject);
  };
  //method to check if document exists in DB
  checkDataBase = async (collection, checkThis) => {
    try {
      const item = await db
        .collection(collection)
        .find(checkThis)
        .toArray();
      // console.log(item);
      return item;
    } catch (err) {
      console.error(err);
    }
  };
  app.get('/breweries', (req, res) => {
    responseTemplate.date = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
    responseTemplate.params = req.query;
    const supportedQueryParameters = [
      'by_name',
      'by_city',
      'by_state',
      'by_type',
      'by_tag'
    ];
    const unsupportedParametersMsg =
      'Invalid Request: Valid queries are: by_name, by_state, by_city, and by_tag.';
    console.log(req.query);
    if (
      !supportedQueryParameters.includes(Object.keys(req.query)[0]) &&
      Object.keys(req.query)[0] != undefined
    ) {
      responseTemplate.response = unsupportedParametersMsg;
      res.status(400).json(responseTemplate);
    } else {
      const databaseVariable = {};
      databaseVariable.byWhat = Object.keys(req.query)[0];
      databaseVariable.breweryWhat = Object.values(req.query)[0];
      // console.log(databaseVariable)
      checkDataBase('breweries', databaseVariable)
        .then((check) => {
          if (check[0] != undefined) {
            console.log('doc exists');
            res.send(check);
          } else {
            console.log('doc does not exist');
          }
          console.log(check);
        })
        .catch('it failed');

      axios
        .get(
          'https://api.openbrewerydb.org/breweries?' +
            Object.keys(req.query)[0] +
            '=' +
            Object.values(req.query)[0]
        )
        .then((networkResponse) => {
          const Array = networkResponse.data;
          if (Array.length != 0) {
            responseTemplate.response = networkResponse.data;
            // console.log(networkResponse.data)
            switch (Object.keys(req.query)[0]) {
              case 'by_name':
                responseTemplate.description =
                  'Returns a list of breweries by name from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag.';
                break;
              case 'by_city':
                responseTemplate.description =
                  'Returns a list of breweries by city from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag.';
                break;
              case 'by_state':
                responseTemplate.description =
                  'Returns a list of breweries by state from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag.';
                break;
              case 'by_type':
                responseTemplate.description =
                  'Returns a list of breweries by type from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag.';
                break;
              case 'by_tag':
                responseTemplate.description =
                  'Returns a list of breweries by tag from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag (dog-friendly, patio, food-service, food-truck, tours).';
                break;
            }
          } else {
            responseTemplate.response =
              'No Brewery by that name, state, type, or with that tag';
          }
          res.send(responseTemplate);
          databaseVariable.response = responseTemplate.response;
          // console.log(databaseVariable);
          addToDatabase('breweries', databaseVariable);
        })
        .catch((e) => {
          res.send('Something is very broken');
        });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Microservice breweries is listening on port ${PORT}`);
});
