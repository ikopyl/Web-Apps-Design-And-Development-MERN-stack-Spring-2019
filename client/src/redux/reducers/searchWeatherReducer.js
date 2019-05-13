import { SEARCH_WEATHER } from '../actions/types';

const initialState = {
  weatherData: {
    consolidated_weather: ['weather']
  },
  searchCity: '',
  searchState: '',
  weather_icon_source: 'https://www.metaweather.com/static/img/weather/s.svg',
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
        weather_icon_source: action.weather_icon_source,

      };
    default:
      return state;
  }
};

export default searchWeatherReducer;
