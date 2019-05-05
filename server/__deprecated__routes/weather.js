const axios = require('axios');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const responseTemplate = require('../ResponseTemplate');

//get location information
// A query parameter is expected,?format=json | jsonp | xml | csv | yaml
router.get('/search', (req, res) => {
  const noQueryParams = Object.keys(req.query).length === 0;
  const noQueryParamsMsg = 'Invalid request: no query parameters';
  const unsupportedParametersMsg = 'Invalid request: supported query parameters include \'?lattlong=\''

  //conditional check to verify that a supported parameter was included and not empty
  if(req.query.lattlong === undefined) {
    responseTemplate.response = unsupportedParametersMsg;
    res.status(400).json(responseTemplate)
  }
  else {
    //get woeid from API in order to make second request
    axios.get('http://metaweather.com/api/location/search/?lattlong=' + req.query.lattlong)
      .then( (res) => {
        console.log('latt long response: ' + res.data[0].woeid);
        console.log('request woeid: ', res.data[0].woeid);
        return axios.get('http://metaweather.com/api/location/' + res.data[0].woeid)
        }
      )
      .then( (networkResponse) => {
        responseTemplate.data = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
        responseTemplate.description =
          'This endpoint provides weather information based on your lattitude and longitude. '
          + 'The required query parameter is \'lattlong '
          + 'Example of use: ?lattlong=37.553800,-122.270000';
        responseTemplate.params = req.query;

        responseTemplate.response = noQueryParams ? noQueryParamsMsg : networkResponse.data;

        noQueryParams ? res.status(400).json(responseTemplate) : res.json(responseTemplate);

      })
      .catch((err) => {
        console.log(err)
        throw new Error();
        res.send('location request failed ' + err);
      });
  }
});

module.exports = router;
