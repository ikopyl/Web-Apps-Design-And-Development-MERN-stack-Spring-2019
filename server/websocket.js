const WebSocket =  require('ws');
const redis = require('redis');
const client = redis.createClient();

const wss = new WebSocket.Server({port: 7500});

wss.on('connection', (ws) => {
    console.log('someone has connected');
});

client.on('message', (channel,message) => {
    console.log(`subscribe hears message ${message}`);
    wss.clients.forEach((client) => {
        client.send(message);
    });
});

client.subscribe('testPublish');