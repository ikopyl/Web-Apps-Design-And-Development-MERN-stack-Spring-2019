const WebSocket = require('ws');
const redis = require('redis');

const {
  REDIS_HOST,
  WEBSOCKET_PORT
} = require('../config');

const client = redis.createClient({
  host: REDIS_HOST
});

const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });

wss.on('connection', (ws) => {
  console.log('someone has connected');
});

client.on('message', (channel, message) => {
  console.log(`subscribe hears message ${message}`);
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

client.subscribe('testPublish');
