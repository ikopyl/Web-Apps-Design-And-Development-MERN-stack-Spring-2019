const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const {
  GATEWAY_PORT,
  WEBSOCKET_HOST,
  LOOKUPMUSICBAND_HOST,
  LOCATION_HOST,
  WEATHER_HOST,
  BREWERIES_HOST,
  MESSANGER_HOST,
  USER_HOST,
} = require('./config');

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
app.listen(GATEWAY_PORT, () => console.log(`Gateway started on port ${GATEWAY_PORT}`));
// appServer.listen(GATEWAY_PORT);
