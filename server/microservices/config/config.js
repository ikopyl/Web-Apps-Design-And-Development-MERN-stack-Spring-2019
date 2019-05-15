module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  USER_PORT: process.env.USER_PORT || 7500,
  URL: process.env.BASE_URL || 'http://localhost:7500',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/finalProject',
  JWT_SECRET: process.env.JWT_SECRET || 'w#7fluDS7pv2JsRPE1IeEQH$hiaRtaXE'
};
