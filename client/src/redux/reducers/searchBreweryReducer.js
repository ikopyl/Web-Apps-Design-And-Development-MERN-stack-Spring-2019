import { SEARCH_BREWERIES } from '../actions/types';

const initialState = {
  breweryWhat: '',
  byWhat: '',
  breweries: []
};

const searchBreweryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BREWERIES:
      console.log(`reducer called action: ${action.type}`);
      console.log(action.payload);
      return {
        ...state,
        breweries: action.payload,
        breweryWhat: action.breweryWhat,
        byWhat: action.byWhat
      };
    default:
      return state;
  }
};

export default searchBreweryReducer;
