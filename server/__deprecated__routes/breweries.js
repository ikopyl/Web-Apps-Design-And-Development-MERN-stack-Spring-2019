const express = require('express');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');

const responseTemplate = require('../ResponseTemplate');

router.get('/', (req, res) => {

  responseTemplate.date = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
  responseTemplate.params = req.query;
  const supportedQueryParameters = ['by_name', 'by_city', 'by_state', 'by_type', 'by_tag'];
  const unsupportedParametersMsg = 'Invalid Request: Valid queries are: by_name, by_state, by_city, and by_tag.'
  console.log(req.query)
  if(!supportedQueryParameters.includes(Object.keys(req.query)[0]) && Object.keys(req.query)[0] != undefined) {
    responseTemplate.response = unsupportedParametersMsg;
    res.status(400).json(responseTemplate)
  }else{
  axios.get('https://api.openbrewerydb.org/breweries?' + Object.keys(req.query)[0] + '=' + Object.values(req.query)[0])
  
  .then((networkResponse) => {
      if (responseTemplate.response != null){
        responseTemplate.response = networkResponse.data;
        switch(Object.keys(req.query)[0]){
            case 'by_name':
                responseTemplate.description = "Returns a list of breweries by name from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag."    
            break;
            case 'by_city':
                responseTemplate.description = "Returns a list of breweries by city from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag."    
            break;
            case 'by_state':
                responseTemplate.description = "Returns a list of breweries by state from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag."
            break;
            case 'by_type':
                responseTemplate.description = "Returns a list of breweries by type from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag."
            break;
            case 'by_tag':
                responseTemplate.description = "Returns a list of breweries by tag from the openbrewerydb API. Valid queries are by_city, by_name, by_state, by_type (micro, regional, brewpub, large, planning, bar, contract, proprietor), and by_tag (dog-friendly, patio, food-service, food-truck, tours)."
            break;
            }
      }
      else{
          responseTemplate.response = "No Brewery by that name, state, type, or with that tag"
      }
      res.send(responseTemplate);
      console.log(responseTemplate);
  })
  .catch((e) => {
      res.send('Something is very broken');
  });
}
});

module.exports = router;
