import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/layout/Header';
import Home from './components/Home';
import LookupMusicBand from './components/LookupMusicBand';
import Breweries from './components/Breweries';
import WeatherData from './components/WeatherData';

import './style/App.css';
import LocationData from "./components/LocationData";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />

            <Route exact path="/" component={Home} />

            <Route path="/lookupmusicband" component={LookupMusicBand} />

            <Route path="/breweries" component={Breweries} />

            <Route path="/weather" component={WeatherData} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
