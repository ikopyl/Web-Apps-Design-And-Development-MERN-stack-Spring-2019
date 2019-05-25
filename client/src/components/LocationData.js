import React, { Component } from 'react';
import axios from 'axios';

import { REACT_APP_PROXY_URL } from '../config';

class LocationData extends Component {
  constructor() {
    super();
    this.state = {
      locationData: [],
      weatherData: [],
      weather_state_abbr: '...',
      weather_icon_source: ''
    };
  }

  componentDidMount() {
    axios
      .get(`${REACT_APP_PROXY_URL}/location?format=json`)
      .then((res) => {
        //console.log("this is the response ", res.data.response)
        this.setState({
          locationData: res.data.response
        });
        return res;
      })
      .then((res) => {
        //console.log(this.state.locationData.latitude, this.state.locationData.longitude);
        return axios.get(
            `${REACT_APP_PROXY_URL}/weather/search?lattlong=` +
            res.data.response.latitude +
            ',' +
            res.data.response.longitude
        );
      })
      .then((res) => {
        console.log(res.data.response.consolidated_weather[0]);

        const weatherStateAbbr =
          res.data.response.consolidated_weather[0].weather_state_abbr;
        const weatherIconSource =
          'https://www.metaweather.com/static/img/weather/' +
          res.data.response.consolidated_weather[0].weather_state_abbr +
          '.svg';

        this.setState({
          weatherData: res.data.response,
          weather_state_abbr: weatherStateAbbr,
          weather_icon_source: weatherIconSource
        });
        console.log(
          'weather data',
          // this.state.weatherData.consolidated_weather[0].weather_state_abbr
          this.state.weather_state_abbr
        );
        console.log('weather icon source: ', this.state.weather_icon_source);
      })
      .catch((err) => {
        console.log(err); // catching any errors
      });
  }

  render() {
    return (
      <div className="container">
        <div className="item">{this.state.locationData.city}</div>
        <div className="item">{this.state.locationData.region_code}</div>
        <img
          className="icon item"
          src={this.state.weather_icon_source}
          alt=""
        />
      </div>
    );
  }
}

export default LocationData;
