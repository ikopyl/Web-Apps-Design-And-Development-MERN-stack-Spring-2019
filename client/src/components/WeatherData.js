import React, {Component} from 'react';
import {searchWeather} from "../redux/actions/weatherActions";
import connect from "react-redux/es/connect/connect";

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      weatherData: {"consolidated_weather": [],},
      searchCity: '',
      searchState: '',
      weather_state_abbr: 'hc',
      weather_icon_source: "https://www.metaweather.com/static/img/weather/s.svg",
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
      <div className="container ui grid">
        <form className='eight wide column row' onSubmit={this.onSubmit} style={{display: 'flex'}}>
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
        <div className="row">
          <div className="ui card">
            <div className="image">
              <img src={this.props.weather_icon_source} alt='weather state icon'></img>
            </div>
            <div className="content">
              <div>
                <span className="ui sub header">Humidity {this.props.weatherData.consolidated_weather[0].humidity}%</span>

              </div>
              <div>
                <span
                  className="ui sub header">Temperature {this.props.weatherData.consolidated_weather[0].the_temp} &nbsp; C</span>
              </div>
              <div>
                <span
                  className="ui sub header">Wind Direction {this.props.weatherData.consolidated_weather[0].wind_direction_compass}</span>
              </div>
              <div>
                <span
                  className="ui sub header">Wind Speed {this.props.weatherData.consolidated_weather[0].wind_speed} &nbsp; km</span>
              </div>
              <div>
                <span className="ui sub header">{this.props.searchCity} &nbsp; {this.props.searchState}</span>
              </div>
            </div>
          </div>
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
  weather_icon_source: state.searchWeather.weather_icon_source,

});

const mapDispatchToProps = {
  searchWeather,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherData);