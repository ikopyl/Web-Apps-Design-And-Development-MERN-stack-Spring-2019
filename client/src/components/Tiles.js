import React, { Component } from 'react';
import Breweries from './Breweries';
import LookupMusicBand from './LookupMusicBand';
import '../style/Tiles.css';
import App from '../App';
<<<<<<< HEAD
import WeatherData from './WeatherData';
=======
import WeatherData from "./WeatherData";
import Messenger from './Messenger'
>>>>>>> bd5a5689733322dd16be035bb26a55b043125b9f

class Tiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: ''
    };
  }

<<<<<<< HEAD
  AppSelector = (app) => {
    console.log(app);
    console.log(this.props.tileType);
    switch (app) {
      case 'BreweriesApp':
        return <Breweries />;
      case 'LookUpMusicBand':
        return <LookupMusicBand />;
      case 'Weather Data':
        return <WeatherData />;
      case '':
        return 'Select an App';
=======
    AppSelector = (app) => {
        console.log(app)
        console.log(this.props.tileType)
        switch(app) {
            case 'BreweriesApp':
                return <Breweries />;
            case 'LookUpMusicBand':
                return <LookupMusicBand />;
            case 'Weather Data':
                return <WeatherData/>;
            case 'Messenger':
                return <Messenger />
            case '':
                return "Select an App"
        };
>>>>>>> bd5a5689733322dd16be035bb26a55b043125b9f
    }
  };

<<<<<<< HEAD
  render() {
    return (
      <div className="appTiles">
        <select
          className="selector"
          value={this.props.tileType}
          onChange={this.props.onChange}
        >
          <option value="">Please Select an App...</option>
          <option value="BreweriesApp">Breweries</option>
          <option value="LookUpMusicBand">Music artists</option>
          <option value="Weather Data">Weather Data</option>
=======
    render() {
        return(
        <div className="appTiles">
        <select 
            className="selector"
            value={this.props.tileType} 
            onChange={this.props.onChange}>
                <option value=''>Please Select an App...</option>
                <option value="BreweriesApp">Breweries</option>
                <option value="LookUpMusicBand">Music artists</option>
                <option value="Weather Data">Weather Data</option>
                <option value="Messenger">Messenger</option>
>>>>>>> bd5a5689733322dd16be035bb26a55b043125b9f
        </select>
        {this.AppSelector(this.props.tileType)}
      </div>
    );
  }
}

export default Tiles;
