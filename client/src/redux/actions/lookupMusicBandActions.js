import axios from 'axios';

import { SEARCH_ALBUMS } from './types';

export const searchAlbums = bandName => dispatch => {
  console.log('action called: searchAlbums');

  const endpoint = `/lookupmusicband?name=${bandName}`;
  return axios
    .get(endpoint)
    .then(res => {
      const musicAlbums = res.data.response;
      console.log(musicAlbums);
      dispatch({
        type: SEARCH_ALBUMS,
        payload: musicAlbums,
        bandName
      });
    })
    .catch(err => {
      console.log(err);
    });
};
