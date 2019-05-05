const axios = require('axios');
const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');

const responseTemplate = require('../ResponseTemplate');
const PORT = 7500;
const app = express();

const errMsg = {
  noQueryKey: 'Invalid parameters',
  noQueryValue: 'Invalid values'
};

const unless = (test, then) => {
  if (!test) then();
};

app.get('/movie', (req, res) => {
  const noQueryKey = Object.keys(req.query).length === 0;
  let noQueryValue = true;
  let noQueryValueDynamicErrMsg = null;

  const url = `https://itunes.apple.com/search?term=${req.query}&entity=movie`;
  console.log(req.query);
  axios
    .get(url)
    .then(networkResponse => {
      let movies = [];

      unless(noQueryKey, () => {
        const queryKey = Object.keys(req.query)[0];
        const queryValue = Object.values(req.query)[0];

        noQueryValue = Object.keys(req.query).length === 0;
        noQueryValueErrMsg = errMsg.noQueryValue.replace('Invalid Query');

        movies = networkResponse.data.results.map(
          movie =>
            new Object({
              director: movie.artistName,
              title: movie.trackName,
              rating: movie.contentAdvisoryRating
            })
        );
      });

      responseTemplate.date = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
      responseTemplate.params = req.query;
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
