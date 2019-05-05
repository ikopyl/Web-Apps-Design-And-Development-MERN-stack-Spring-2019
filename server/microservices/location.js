const express = require('express');
const moment = require('moment');
const axios = require('axios');
//const router = express.Router();

const bodyParser = require('body-parser');

//creating an app here as a microservice
const app = express();
app.use(bodyParser.json());

const PORT = 7200;

const responseTemplate = require('../ResponseTemplate');

//get location information
// A query parameter is expected,?format=json | jsonp | xml | csv | yaml
app.get('/location', (req, res) => {
  const noQueryParams = Object.keys(req.query).length === 0;
  const noQueryParamsMsg = 'Invalid request: no query parameters';
  const supportedQueryParameters = ['json', 'jsonp', 'xml', 'csv', 'yaml'];
  const unsupportedParametersMsg = 'Invalid request: supported query parameters include json, jsonp, xml, csv, and yaml'

  //conditional check to verify that a supported parameter was included and not empty
  if(!supportedQueryParameters.includes(req.query.format) && req.query.format != undefined) {
    responseTemplate.response = unsupportedParametersMsg;
    res.status(400).json(responseTemplate)
  }
  else {
    //get external IP from ipify API, then use that IP to get the location from the ipapi API
    axios.get('https://api.ipify.org?format=text')
      .then((response) => {
        const url = 'https://ipapi.co/' + response.data + '/' + (noQueryParams ? 'json' : req.query.format) + '/';
        console.log(url);
        //returning the response from the location API so that the following promise has access to it
        return axios.get(url)
      })
      .then((networkResponse) => {
        responseTemplate.data = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
        responseTemplate.description =
          'This endpoint provides location information based on your public ip. '
          + 'The required query parameter is \'format\'. '
          + 'json, jsonp, xml, csv, yaml are supported '
          + 'Example of use: location?format=json';
        responseTemplate.params = req.query;

        responseTemplate.response = noQueryParams ? noQueryParamsMsg : networkResponse.data;

        noQueryParams ? res.status(400).json(responseTemplate) : res.json(responseTemplate);

      })
      .catch((err) => {
        console.log(err)
        throw new Error();
        res.send('location request failed' + err);
      });
  }
});


app.listen(PORT, () => {
  console.log(`Microservice location is listening on port ${PORT}`);
});