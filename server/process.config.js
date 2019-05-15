module.exports = {
  apps: [
    {
      name: 'gateway',
      script: './gateway.js',
      watch: true
    },
    {
      name: 'lookupmusicband',
      script: './microservices/lookupmusicband.js',
      watch: true
    },
    {
      name: 'breweries',
      script: './microservices/breweries.js',
      watch: true
    },
    {
      name: 'location',
      script: './microservices/location.js',
      watch: true
    },
    {
      name: 'weather',
      script: './microservices/weather.js',
      watch: true
    },
    {
      name: 'messenger', 
      script: './microservices/messanger.js',
      watch: true
    }
  ]
};
