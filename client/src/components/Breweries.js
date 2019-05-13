import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/Breweries.css'
import {searchBrewery} from '../redux/actions/searchBreweries'


class Breweries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breweryWhat: '',
      byWhat: '',
      breweries: [],
      favorite: [],
    };
  }

      onSubmit = e => {
        e.preventDefault();
        this.props.searchBrewery(this.state.byWhat, this.state.breweryWhat);
        this.setState({
          breweryWhat: '',
          byWhat: '',
        });
      };

      onChange = e => {
        this.setState({
          [e.target.name]: e.target.value, // setting the brewery to whatever we type in
        });
      };

      onChange2 = e => {
        this.setState({byWhat: e.target.value})
      };

      onFavorite = e => {
        const newFavorites = this.state.favorite.slice();
        const target = e.target;
        const i = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        newFavorites[i] = value;
        this.setState({
          favorite: newFavorites
          });
        };

    render() {
        return(
          <div>
            <form onSubmit={this.onSubmit} stlye={{ display: 'flex'}}>
            <select 
              value={this.state.byWhat} 
              onChange={this.onChange2}>
                <option>Please Select a Value...</option>
                <option value="by_city">By City</option>
                <option value="by_name">By Name</option>
                <option value="by_state">By State</option>
            </select>
            <input
            type="text"
            name="breweryWhat"
            style={{ flex: '10', padding: '5px' }}
            placeholder="Please enter a city name..."
            value={this.state.breweryWhat}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: '1' }}
          />
            </form>

        <div className="tabelsize">
          { <table>
              <tbody>
                <tr className="tableheader">
                  <th>Brewery Name</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Address</th>
                  <th>Type of Brewery</th>
                  <th>Phone Number</th>
                </tr>
              {this.props.breweries.map((r,i) => {
                return (
                  <tr>
                    <td className="tableelement">{r.name}</td>
                    <td className="tableelement">{r.city}</td>
                    <td className="tableelement">{r.state}</td>
                    <td className="tableelement">{r.street}</td>
                    <td className="tableelement">{r.brewery_type}</td>
                    <td className="tableelement">{r.phone}</td>
                    <td>
                      <input
                          type="checkbox"
                          name={i}
                          checked={this.state.favorite[i]}
                          onChange={this.onFavorite}
                        />
                      </td>
                  </tr>
                  );
                  })}
          </tbody>
        </table> }
       </div>
          </div>
        )
    }
   
}

const mapStateToProps = state => ({
  // brewerySearch - the label of searchBreweryReducer, 
  // specified under ./client/src/redux/reducers/index.js
  breweries: state.brewerySearch.breweries,
  byWhat: state.brewerySearch.byWhat,
  breweryWhat: state.brewerySearch.breweryWhat
});

const mapDispatchToProps = {
  searchBrewery,
};

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Breweries);