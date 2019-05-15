const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const app = express();
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy is down...');
});

const wsProxy = httpProxy.createProxyServer({
  target: 'http://localhost:6000',
  ws: true,
});

app.all('/search*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:7100/' });
});

app.all('/location*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:7200/' });
});

app.all('/weather*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:7300/' });
});

app.all('/breweries*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:7400/' });
});

app.all('/messanger*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:7500' });
});

app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: 'http://localhost:6000/websocket' });
});

app.all('/user*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:8000/' });

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  console.log(req);
  wsProxy.ws(req, socket, head);
});

const PORT = process.env.GATEWAY_PORT || 5000;

app.listen(PORT, () => console.log(`Gateway started on port ${PORT}`));
