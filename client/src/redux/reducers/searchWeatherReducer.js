import { SEARCH_WEATHER } from '../actions/types';

const initialState = {
  weatherData: {
    consolidated_weather: ['weather']
  },
  searchCity: '',
  searchState: '',
};

const searchWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WEATHER:
      console.log(`reducer called on action: ${action.type}`);
      return {
        ...state,
        weatherData : action.payload,
        searchCity: action.searchCity,
        searchState: action.searchState,

      };
    default:
      return state;
  }
};

export default searchWeatherReducer;
