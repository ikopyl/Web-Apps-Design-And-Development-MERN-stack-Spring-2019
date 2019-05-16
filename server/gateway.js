const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const config = require('./config');
const PORT = config.GATEWAY_PORT;                           // 5000

const WEBSOCKET_PORT = config.WEBSOCKET_PORT;               // 6000
const LOOKUPMUSICBAND_PORT = config.LOOKUPMUSICBAND_PORT;   // 7100
const LOCATION_PORT = config.LOCATION_PORT;                 // 7200
const WEATHER_PORT = config.WEATHER_PORT;                   // 7300
const BREWERIES_PORT = config.BREWERIES_PORT;               // 7400
const MESSANGER_PORT = config.MESSANGER_PORT;               // 7500
const USER_PORT = config.USER_PORT;                         // 8000

const WEBSOCKET_HOST = config.WEBSOCKET_HOST;               // localhost:6000
const LOOKUPMUSICBAND_HOST = config.LOOKUPMUSICBAND_HOST;   // localhost:7100
const LOCATION_HOST = config.LOCATION_HOST;                 // localhost:7200
const WEATHER_HOST = config.WEATHER_HOST;                   // localhost:7300
const BREWERIES_HOST = config.BREWERIES_HOST;               // localhost:7400
const MESSANGER_HOST = config.MESSANGER_HOST;               // localhost:7500
const USER_HOST = config.USER_HOST;                         // localhost:8000

const app = express();
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);


apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy is down...');
});

const wsProxy = httpProxy.createProxyServer({
  // target: `http://localhost:${WEBSOCKET_PORT}`,
  target: WEBSOCKET_HOST,
  ws: true
});

app.all('/search*', (req, res) => {
  // apiProxy.web(req, res, { target: `http://localhost:${LOOKUPMUSICBAND_PORT}/` });
  apiProxy.web(req, res, { target: LOOKUPMUSICBAND_HOST });
});

app.all('/location*', (req, res) => {
  // apiProxy.web(req, res, { target: `http://localhost:${LOCATION_PORT}/` });
  apiProxy.web(req, res, { target: LOCATION_HOST });
});

app.all('/weather*', (req, res) => {
  // apiProxy.web(req, res, { target: `http://localhost:${WEATHER_PORT}/` });
  apiProxy.web(req, res, { target: WEATHER_HOST });
});

app.all('/breweries*', (req, res) => {
  // apiProxy.web(req, res, { target: `http://localhost:${BREWERIES_PORT}/` });
  apiProxy.web(req, res, { target: BREWERIES_HOST });
});

app.all('/messanger*', (req, res) => {
  // apiProxy.web(req, res, { target: `http://localhost:${MESSANGER_PORT}` });
  apiProxy.web(req, res, { target: MESSANGER_HOST });
});

app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  // apiProxy.web(req, res, { target: `http://localhost:${WEBSOCKET_PORT}/websocket` });
  apiProxy.web(req, res, { target: WEBSOCKET_HOST });
});

app.all('/user*', (req, res) => {
  // apiProxy.web(req, res, { target: `http://localhost:${USER_PORT}/` });
  apiProxy.web(req, res, { target: USER_HOST });
});

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  console.log(req);
  wsProxy.ws(req, socket, head);
});

// app.listen(PORT, () => console.log(`Gateway started on port ${PORT}`));
appServer.listen(PORT);
