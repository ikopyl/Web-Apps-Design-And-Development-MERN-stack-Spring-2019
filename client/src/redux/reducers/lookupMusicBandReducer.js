import {
  SEARCH_ALBUMS,
  SAVE_ALBUMS,
  LOAD_ALBUMS,
  CHECK_IF_BAND_IN_DB,
  UPDATE_SEARCH_STRING
} from '../actions/types';

const initialState = {
  bandName: '',
  searchString: '',
  albums: [],
  btnSaveToDBHidden: true,
  btnLoadFromDBHidden: true,
  savedInDB: false,
  savedRecordId: ''
};

const lookupMusicBandReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ALBUMS:
      console.log(`reducer called on action: ${action.type}`);
      return {
        ...state,
        albums: action.payload,
        bandName: action.bandName.toLowerCase(),
        savedInDB: action.savedInDB,
        btnLoadFromDBHidden: action.btnLoadFromDBHidden,
        btnSaveToDBHidden: action.btnSaveToDBHidden
      };
    case SAVE_ALBUMS:
      return {
        ...state,
        bandName: action.bandName,
        savedInDB: action.savedInDB,
        savedRecordId: action.savedRecordId,
        btnSaveToDBHidden: action.savedInDB,
        btnLoadFromDBHidden: action.savedInDB
      };
    case LOAD_ALBUMS:
      return {
        ...state,
        albums: action.albums,
        bandName: action.bandName,
        savedInDB: action.savedInDB,
        btnSaveToDBHidden: action.savedInDB,
        btnLoadFromDBHidden: action.savedInDB
      };
    case CHECK_IF_BAND_IN_DB:
      return {
        ...state,
        savedInDB: action.savedInDB,
        savedRecordId: action.savedRecordId,
        btnLoadFromDBHidden: !action.savedInDB,
        btnSaveToDBHidden: action.btnSaveToDBHidden
      };
    case UPDATE_SEARCH_STRING:
      return {
        ...state,
        bandName: action.bandName.toLowerCase(),
        searchString: action.bandName
      };
    default:
      return state;
  }
};

export default lookupMusicBandReducer;
