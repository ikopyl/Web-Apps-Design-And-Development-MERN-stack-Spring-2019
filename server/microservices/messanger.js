const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');

const {
  MESSANGER_PORT,
  DB_URL,
  DB_NAME,
  DB_MESSANGER_COLLECTION_NAME,
  REDIS_HOST
} = require('../config');

const client = redis.createClient({
  host: REDIS_HOST
});

//move app logic in here
const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(DB_URL, {
  useNewUrlParser: true
});

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(DB_NAME);

  app.get('/messanger/getMessages', (req, res) => {
    db.collection(DB_MESSANGER_COLLECTION_NAME)
      .find({})
      .toArray()
      .then((result) => {
        res.send(result.map((r) => r.data));
      })
      .catch((e) => console.log(e));
  });

  app.post('/messanger/postMessage', (req, res) => {
    console.log(req.body);
    db.collection(DB_MESSANGER_COLLECTION_NAME)
      .insertOne({ data: req.body.message })
      .then(() => console.log('db instert worked'))
      .catch((e) => console.log(e));
    client.publish('testPublish', req.body.message);
    res.send('ok');
  });

  app.listen(MESSANGER_PORT, () => {
    console.log(`Microservice messenger is listening on port ${MESSANGER_PORT}`);
  });
  //end app logic
});
