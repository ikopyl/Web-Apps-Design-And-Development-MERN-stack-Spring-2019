module.exports = {
  ENV: process.env.NODE_ENV || 'development',

  REDIS_HOST: process.env.REDIS_HOST || 'localhost',

  FRONT_END_HOST: process.env.FRONT_END_HOST || 'http://localhost:3000',

  WEBSOCKET_HOST: process.env.WEBSOCKET_HOST || 'http://localhost:6000/websocket',
  LOOKUPMUSICBAND_HOST: process.env.LOOKUPMUSICBAND_HOST || 'http://localhost:7100',
  LOCATION_HOST: process.env.LOCATION_HOST || 'http://localhost:7200',
  WEATHER_HOST: process.env.WEATHER_HOST || 'http://localhost:7300',
  BREWERIES_HOST: process.env.BREWERIES_HOST || 'http://localhost:7400',
  MESSANGER_HOST: process.env.MESSANGER_HOST || 'http://localhost:7500',
  USER_HOST: process.env.USER_HOST || 'http://localhost:8000',


  GATEWAY_PORT: process.env.GATEWAY_PORT || 5000,

  WEBSOCKET_PORT: process.env.WEBSOCKET_PORT || 6000,
  LOOKUPMUSICBAND_PORT: process.env.LOOKUPMUSICBAND_PORT || 7100,
  LOCATION_PORT: process.env.LOCATION_PORT || 7200,
  WEATHER_PORT: process.env.WEATHER_PORT || 7300,
  BREWERIES_PORT: process.env.BREWERIES_PORT || 7400,
  MESSANGER_PORT: process.env.MESSANGER_PORT || 7500,
  USER_PORT: process.env.USER_PORT || 8000,



  // URL: process.env.BASE_URL || 'http://localhost:7500',

  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',
  DB_NAME: process.env.DB_NAME || 'finalProject',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/finalProject',

  DB_MESSANGER_COLLECTION_NAME: process.env.DB_MESSANGER_COLLECTION_NAME || 'messages',

  JWT_SECRET: process.env.JWT_SECRET || 'w#7fluDS7pv2JsRPE1IeEQH$hiaRtaXE'
};
