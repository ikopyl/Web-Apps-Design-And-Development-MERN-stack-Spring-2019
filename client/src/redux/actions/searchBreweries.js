import axios from 'axios';

import { SEARCH_BREWERIES } from './types';
import { REACT_APP_PROXY_URL } from '../../config';

export const searchBrewery = (byWhat, breweryWhat) => dispatch => {

  const endpoint = `${REACT_APP_PROXY_URL}/breweries?${byWhat}=${breweryWhat}`;
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
