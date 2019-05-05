import { combineReducers } from 'redux';
import lookupMusicBandReducer from './lookupMusicBandReducer';
import searchBreweryReducer from './searchBreweryReducer';
import searchWeatherReducer from './searchWeatherReducer';

export default combineReducers({
  musicSearch: lookupMusicBandReducer,
  brewerySearch: searchBreweryReducer,
  searchWeather: searchWeatherReducer,
});
