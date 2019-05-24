import axios from 'axios';

import { SEARCH_BREWERIES } from './types';
import { PROXY_URL } from '../../config';

export const searchBrewery = (byWhat, breweryWhat) => dispatch => {

  const endpoint = `/breweries?${byWhat}=${breweryWhat}`;
  // const endpoint = `${PROXY_URL}/breweries?${byWhat}=${breweryWhat}`;
  return axios
    .get(endpoint)
    .then(res => {
      const breweries = res.data.response;
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
