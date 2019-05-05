import axios from 'axios';

import { SEARCH_WEATHER } from './types';

export const searchWeather = (searchCity, searchState) => dispatch => {
  console.log('action called: searchWeather', searchCity, searchState);

  const endpoint = `/weather?city=${searchCity}`;
  return axios
    .get(endpoint)
    .then(res => {
      const weatherData = res.data.response;
      console.log('weatherAction.js response from endpoint: ', weatherData);
      dispatch({
        type: SEARCH_WEATHER,
        payload: weatherData,
        searchCity,
        searchState,
      });
    })
    .catch(err => {
      console.log(err);
    });

};
