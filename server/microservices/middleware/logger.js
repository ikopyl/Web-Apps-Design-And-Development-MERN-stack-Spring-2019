const logRequest = (req) => {
  console.log(`Request from: ${req.originalUrl}`);
  console.log(`Request type: ${req.method}`);
}

module.exports = { logRequest };