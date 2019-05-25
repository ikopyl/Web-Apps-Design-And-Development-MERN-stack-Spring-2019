const ENV = process.env.NODE_ENV || 'development';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'finalProject';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finalProject';

const DB_MESSANGER_COLLECTION_NAME = process.env.DB_MESSANGER_COLLECTION_NAME || 'messages';

const GATEWAY_PORT = process.env.GATEWAY_PORT || 5000;
// const FRONT_END_HOST = process.env.FRONT_END_HOST || 'http://localhost:3000';

const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 9000;
const LOOKUPMUSICBAND_HOST = process.env.LOOKUPMUSICBAND_HOST || 'http://localhost:7100';
const LOOKUPMUSICBAND_PORT = process.env.LOOKUPMUSICBAND_PORT || 7100;
const LOCATION_HOST = process.env.LOCATION_HOST || 'http://localhost:7200';
const LOCATION_PORT = process.env.LOCATION_PORT || 7200;
const WEATHER_HOST = process.env.WEATHER_HOST || 'http://localhost:7300';
const WEATHER_PORT = process.env.WEATHER_PORT || 7300;
const BREWERIES_HOST = process.env.BREWERIES_HOST || 'http://localhost:7400';
const BREWERIES_PORT = process.env.BREWERIES_PORT || 7400;
const MESSANGER_HOST = process.env.MESSANGER_HOST || 'http://localhost:7500';
const MESSANGER_PORT = process.env.MESSANGER_PORT || 7500;
const USER_HOST = process.env.USER_HOST || 'http://localhost:8000';
const USER_PORT = process.env.USER_PORT || 8000;

const JWT_SECRET = process.env.JWT_SECRET || 'w#7fluDS7pv2JsRPE1IeEQH$hiaRtaXE';



  // URL: process.env.BASE_URL || 'http://localhost:7500',

module.exports = {
  REDIS_HOST,
  DB_URL,
  DB_NAME,
  MONGODB_URI,
  DB_MESSANGER_COLLECTION_NAME,
  WEBSOCKET_PORT,
  LOOKUPMUSICBAND_HOST,
  LOOKUPMUSICBAND_PORT,
  LOCATION_HOST,
  LOCATION_PORT,
  WEATHER_HOST,
  WEATHER_PORT,
  BREWERIES_HOST,
  BREWERIES_PORT,
  MESSANGER_HOST,
  MESSANGER_PORT,
  USER_HOST,
  USER_PORT,
  GATEWAY_PORT
};
