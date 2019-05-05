import axios from 'axios';

import { SEARCH_BREWERIES } from './types';

export const searchBrewery = (byWhat, breweryWhat) => dispatch => {
  console.log('action: searchBrewery');
  console.log(byWhat + ' ' + ' ' + breweryWhat);

  const endpoint = `/breweries?${byWhat}=${breweryWhat}`;
  return axios
    .get(endpoint)
    .then(res => {
      const breweries = res.data.response;
      console.log('next log is the response from action');
      console.log(breweries);
      dispatch({
        type: SEARCH_BREWERIES,
        payload: breweries,
        breweryWhat,
        byWhat
      });
    })
    .catch(err => {
      console.log(err);
    });
};
