import React, {Component} from 'react';
import {searchWeather} from "../redux/actions/weatherActions";
import connect from "react-redux/es/connect/connect";

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      weatherData: [1,2,3],
      searchCity: '',
      searchState: '',
      weather_state_abbr: '...',
      weather_icon_source: '',
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
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
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
          {JSON.stringify(this.props.weatherData)}
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