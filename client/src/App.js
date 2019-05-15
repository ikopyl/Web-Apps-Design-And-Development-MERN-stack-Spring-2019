import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/layout/Header';
import Home from './components/Home';
import LookupMusicBand from './components/LookupMusicBand';
import Breweries from './components/Breweries';
import WeatherData from './components/WeatherData';
import Pokedex from './components/Pokedex';
// import TileTypes from './components/TileTypes'

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

  onChange = e => {
    this.setState({app: e.target.value})
  }
  addApp = () => {
    const newIndexapps = this.state.indexApps.slice();
    newIndexapps.push({ 
      key: newIndexapps.length,
      tileType: null
    })
    this.setState({
      indexApps: newIndexapps
      });
  }

  removeApp = () => {
    const newIndexapps = this.state.indexApps.slice();
    newIndexapps.pop();
      this.setState({
        indexApps: newIndexapps
        });
  }
  render() {
    console.log(this.state.indexApps)
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />

            <Route exact path="/" component={Home} />

            <Route path="/lookupmusicband" component={LookupMusicBand} />

            <Route path="/breweries" component={Breweries} />

            <Route path="/weather" component={WeatherData} />

            <Route path="/pokedex" component={Pokedex} />
          </div>
        </BrowserRouter>
        <button onClick={this.addApp}>Add an App</button>
        <button onClick={this.removeApp}>Remove an App</button>
        <div className="masterDiv">
          {this.state.indexApps.map((i) => {
            console.log(i)
            return( <div>
              <Tiles key={i.key} tileType={i.tileType} onChange ={ (e) => {
                 const newIndexapps = this.state.indexApps.slice();
                 newIndexapps[i.key].tileType = e.target.value
                 this.setState({
                  indexApps: newIndexapps,

                  });
              }}

              />
              <div>{i.key}</div>
            </div>
            ); 
          })    
          }
        </div>
      </Provider>
      

    );
  }
}

export default App;
