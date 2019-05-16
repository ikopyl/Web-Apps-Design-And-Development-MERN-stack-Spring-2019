const WebSocket = require('ws');
const redis = require('redis');
const config = require('../config');

const REDIS_HOST = config.REDIS_HOST;   // localhost
const PORT = config.WEBSOCKET_PORT;     // 6000

const client = redis.createClient({
  host: REDIS_HOST
});

const wss = new WebSocket.Server({ port: PORT });

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
