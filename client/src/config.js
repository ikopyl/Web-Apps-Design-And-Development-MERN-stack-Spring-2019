const PROXY_URL = process.env.PROXY_URL || 'http://localhost:5000';
const WEBSOCKET_URL = process.env.WEBSOCKET_URL || 'ws://localhost:5000/websocket';

module.exports = {
  PROXY_URL,
  WEBSOCKET_URL
};
