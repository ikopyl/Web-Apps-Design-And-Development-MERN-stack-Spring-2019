const { MongoClient } = require('mongodb');

const databaseUrl = 'mongodb://localhost:27017';
const databaseName = 'HW3';
const client = new MongoClient(databaseUrl);
let db = null;

const getConnection = callback => {
  if (db) return callback(db);
  client.connect(err => {
    if (err) {
      console.log(err);
    }
    console.log('Connected successfully to server');
    db = client.db(databaseName);
    return callback(db);
  });
};

module.exports = databaseHandler = {
  db: db,

  //getter functions
  getFromDatabaseCollection(collection, searchFor) {
    db.collection(collection)
      .find(searchFor)
      .toArray()
      .then(docs => {
        return docs;
      })
      .catch(e => {
        return e;
      });
  },

  addToDatabase(collection, addThisObject) {
    db.collection(collection).insertOne(addThisObject);
  },

  findAndUpdateInDatabase(collection, find, value) {
    const updater = {
      $set: {
        empty: 'some value'
      }
    };
    db.collection(collection)
      .findOneAndUpdate(
        {
          query: value
        },
        updater
      )
      .then(docs => {
        return docs;
      })
      .catch(e => {
        return e;
      });
  }
};

db = getConnection(function(response) {
  databaseHandler.db = response;
  console.log('database value in databaseHandler: ', databaseHandler.db);
  return response;
});

module.exports = {
  databaseHandler: databaseHandler
};
