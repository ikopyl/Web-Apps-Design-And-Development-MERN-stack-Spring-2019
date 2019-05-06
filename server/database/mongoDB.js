const express = require('express');
const moment = require('moment');
const axios = require('axios');
const {MongoClient} = require('mongodb');

const bodyParser = require('body-parser');

//mongodb url & database name
const databaseUrl = 'mongodb://localhost:27017';
const databaseName = 'HW3';

//creating a new MongoClient
const client = new MongoClient(databaseUrl);

let db;

//you will need this method in each of your backends in order to establish a connection to the database and manage the async weirdness
const getConnection = (callback) => {
  if(db) return callback(db);
  client.connect((err) => {
    console.log("Connected successfully to server");
    db = client.db(databaseName);
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
    connection.collection(collection).updateOne(findThis, {$set: updateToThis}, function(err, res) {
      if(err) throw err;
      console.log("1 document updated");
    });
  });
};

//helper method for updating all documents that match the first parameter
//first parameter is the string name of the collection, second is an object {findObjectWithThisValue:"value"}, third is an object {updatedOrNewKey:"value"}
const findAndUpdateMany = (collection, findThis, updateToThis) => {
  getConnection((connection) => {
    connection.collection(collection).updateMany(findThis, {$set: updateToThis}, function(err, res) {
      if(err) throw err;
      console.log(res.result.nModified + " document(s) updated");
    });
  });
};

//helper method for deleting the first documents that match the first parameter
//first parameter is the string name of the collection, the second is an object {findObjectWithThisValue:"value"}
const findAndDelete = (collection, findThis) => {
  getConnection((connection) => {
    connection.collection(collection).deleteOne(findThis, function(err, res) {
      if(err) throw err;
      console.log("1 document deleted");
    });
  });
};

//helper method for deleting the all documents that match the first parameter
//first parameter is the string name of the collection, the second is an object {findObjectWithThisValue:"value"}
const findAndDeleteMany = (collection, findThis) => {
  getConnection((connection) => {
    connection.collection(collection).deleteMany(findThis, function(err, res) {
      if(err) throw err;
      console.log(res.result.n + " document(s) deleted");
    });
  });
};