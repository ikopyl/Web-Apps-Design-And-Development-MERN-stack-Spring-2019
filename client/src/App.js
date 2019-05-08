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
import Tiles from './components/Tiles';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        indexApps: []
    }
}
  addApp = () => {
    const newIndexapps = this.state.indexApps.slice();
    const lengthIndex = newIndexapps.length;
    newIndexapps[lengthIndex] = lengthIndex + 1;
    this.setState({
      indexApps: newIndexapps
      });
  }

  removeApp = () => {
    const newIndexapps = this.state.indexApps.slice();
    let popped = newIndexapps.pop();
      this.setState({
        indexApps: newIndexapps
        });
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />

            <Route exact path="/" component={Home} />

            <Route path="/lookupmusicband" component={LookupMusicBand} />

            <Route path="/breweries" component={Breweries} />

            <Route path="/location" component={LocationData} />

            <Route path="/weather" component={WeatherData} />
          </div>
        </BrowserRouter>
        <button onClick={this.addApp}>Add an App</button>
        <button onClick={this.removeApp}>Remove an App</button>
        {this.state.indexApps.map((i) => {
          return <Tiles key={i} />
        })
      }
        {/* <div><Tiles /></div> */}
      </Provider>
      

    );
  }
}

export default App;
