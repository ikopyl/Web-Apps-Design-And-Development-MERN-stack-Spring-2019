import React, {Component} from 'react';
import {searchWeather} from "../redux/actions/weatherActions";
import connect from "react-redux/es/connect/connect";

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      weatherData: {},
      searchCity: '',
      searchState: '',
      weather_state_abbr: 'hc',
      weather_icon_source: 'the-internet',
      humidity: 'Muggy',
      wind_direction_compass: 'West',
      wind_speed: 'Gusty',
      the_temp: 'Hot',

    };
  }

  onSubmit = e => {
    e.preventDefault();

    console.log('this.props.searchCity:');
    console.log(this.state.searchCity);
    console.log('this.props.searchState:');
    console.log(this.state.searchState);
    console.log('this.props.weatherData:');
    console.log(this.props.weatherData);
    this.props.searchWeather(this.state.searchCity, this.state.searchState);

    this.setState({
      searchCity: '',
      searchState: '',
    });

  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value // setting the search City to whatever we type in
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
          <label>
            City:
            <input
              type="text"
              name="searchCity"
              placeholder="Please enter a City..."
              value={this.state.searchCity}
              onChange={this.onChange}/>
          </label>
          <label>
            State:
            <input
              type="text"
              name="searchState"
              placeholder="Please enter a State..."
              value={this.state.searchState}
              onChange={this.onChange}/>
          </label>
          <input
            type="Submit"
            value="Search"
            className='btn'
          />
        </form>
        <div>
          {this.props.weatherData.consolidated_weather.map((r) => {
            return (

              <div className="ui card">
                <div className="image">
                  <img src="https://www.metaweather.com/static/img/weather/c.svg"></img>
                </div>
                <div className="content">
                  <div>
                    <span className="ui sub header">Humidity</span> <span>{r.humidity}</span>
                  </div>
                  <div>
                    <span className="ui sub header">Temperature {r.the_temp}</span>
                  </div>
                  <div>
                    <span className="ui sub header">Wind Direction {r.wind_direction_compass}</span>
                  </div>
                  <div>
                    <span className="ui sub header">Wind Speed {r.wind_speed}</span>
                  </div>
                  <div>
                    <span className="ui sub header">{r.weather_state_abbr}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // searchWeather - the label of searchBreweryReducer,
  // specified under ./client/src/redux/reducers/index.js
  searchCity: state.searchWeather.searchCity,
  searchState: state.searchWeather.searchState,
  weatherData: state.searchWeather.weatherData,
});

const mapDispatchToProps = {
  searchWeather,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherData);