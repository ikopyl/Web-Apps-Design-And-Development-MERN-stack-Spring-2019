import { SEARCH_ALBUMS } from '../actions/types';

const initialState = {
  bandName: '',
  albums: []
};

const lookupMusicBandReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ALBUMS:
      console.log(`reducer called on action: ${action.type}`);
      return {
        ...state,
        albums: action.payload,
        bandName: action.bandName
      };
    default:
      return state;
  }
};

export default lookupMusicBandReducer;
