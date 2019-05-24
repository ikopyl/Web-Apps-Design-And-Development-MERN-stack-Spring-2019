import axios from 'axios';

import {
  SEARCH_ALBUMS,
  SAVE_ALBUMS,
  LOAD_ALBUMS,
  CHECK_IF_BAND_IN_DB,
  UPDATE_SEARCH_STRING
} from './types';

import { PROXY_URL } from '../../config';

export const searchAlbums = () => (dispatch, getState) => {
  console.log('action called: searchAlbums');

  const bandName = getState().musicSearch.bandName;

  const endpoint = `/search?name=${bandName}`;
  // const endpoint = `${PROXY_URL}/search?name=${bandName}`;
  return axios
    .get(endpoint)
    .then((res) => {
      const musicAlbums = res.data.response;
      console.log(musicAlbums);
      dispatch({
        type: SEARCH_ALBUMS,
        payload: musicAlbums,
        bandName,
        savedInDB: getState().musicSearch.savedInDB,
        btnLoadFromDBHidden: true,
        btnSaveToDBHidden: getState().musicSearch.savedInDB
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveToDB = () => (dispatch, getState) => {
  console.log('action called: saveToDB');

  const endpoint = `/search_result`;
  // const endpoint = `${PROXY_URL}/search_result`;

  const bandName = getState().musicSearch.bandName;

  const body = {
    query: bandName,
    musicAlbums: getState().musicSearch.albums
  };

  console.log(body);

  return axios
    .post(endpoint, body)
    .then((res) => {
      console.log(res.data);
      const savedRecordId = res.data._id;

      dispatch({
        type: SAVE_ALBUMS,
        bandName,
        payload: getState().musicSearch.albums,
        savedInDB: true,
        savedRecordId
      });
    })
    .catch((err) => console.log(err));
};

export const loadFromDB = () => (dispatch, getState) => {
  console.log('action called: loadFromDB');

  const bandName = getState().musicSearch.bandName;

  const endpoint = `/search_result?name=${bandName}`;
  // const endpoint = `${PROXY_URL}/search_result?name=${bandName}`;
  return axios
    .get(endpoint)
    .then((res) => {
      dispatch({
        type: LOAD_ALBUMS,
        bandName,
        albums: res.data.music_albums,
        savedInDB: true
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkIfBandInDB = () => (dispatch, getState) => {
  console.log('action called: checkIfBandInDB');

  const bandName = getState().musicSearch.bandName;

  const endpoint = `/search_results`;
  // const endpoint = `${PROXY_URL}/search_results`;
  return axios
    .get(endpoint)
    .then((res) => {
      const savedRecord = res.data.find(
        (record) => record.search_query === getState().musicSearch.bandName
      );
      const savedInDB = savedRecord ? true : false;
      let savedRecordId = '';
      if (savedInDB) {
        savedRecordId = savedRecord._id;
      }

      console.log(`savedInDB: ${savedInDB}`);
      console.log(`savedRecordId: ${savedRecordId}`);
      dispatch({
        type: CHECK_IF_BAND_IN_DB,
        bandName,
        savedInDB,
        btnLoadFromDBHidden: !savedInDB,
        btnSaveToDBHidden: true,
        savedRecordId
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateSearchString = (bandName) => {
  return {
    type: UPDATE_SEARCH_STRING,
    bandName
  };
};
