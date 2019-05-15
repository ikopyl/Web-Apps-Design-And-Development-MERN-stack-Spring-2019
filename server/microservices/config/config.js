module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  LOOKUPMUSICBAND_PORT: process.env.LOOKUPMUSICBAND_PORT || 7100,
  USER_PORT: process.env.USER_PORT || 8000,
  URL: process.env.BASE_URL || 'http://localhost:7500',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/finalProject',
  JWT_SECRET: process.env.JWT_SECRET || 'w#7fluDS7pv2JsRPE1IeEQH$hiaRtaXE'
};
