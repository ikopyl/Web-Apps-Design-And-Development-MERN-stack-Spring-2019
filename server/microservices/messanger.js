const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient();

const config = require('../config');
const PORT = config.MESSANGER_PORT;
// const PORT = process.env.MESSANGER_PORT || 7500;

const DB_URL = config.DB_URL;         // mongodb://localhost:27017
const DB_NAME = config.DB_NAME;       // finalProject

const mongoClient = new MongoClient(DB_URL);

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(DB_NAME);

  //move app logic in here
  const app = express();
  app.use(bodyParser.json());

  app.get('/messanger/getMessages', (req, res) => {
    db.collection('test')
      .find({})
      .toArray()
      .then((result) => {
        res.send(result.map((r) => r.data));
      })
      .catch((e) => console.log(e));
  });

  app.post('/messanger/postMessage', (req, res) => {
    console.log(req.body);
    db.collection('test')
      .insertOne({ data: req.body.message })
      .then(() => console.log('db instert worked'))
      .catch((e) => console.log(e));
    client.publish('testPublish', req.body.message);
    res.send('ok');
  });

  app.listen(PORT, () => {
    console.log(`Microservice messenger is listening on port ${PORT}`);
  });
  //end app logic
});
