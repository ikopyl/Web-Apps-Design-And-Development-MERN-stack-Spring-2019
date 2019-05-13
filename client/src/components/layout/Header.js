import React from 'react';
import {Link} from 'react-router-dom';
import LocationData from '../LocationData';

const Header = () => {
  return (
    <header className="headerStyle">
      <span className="columnStyle">
        <h1 className="header-left-align">My Dashboard</h1>
        <Link className="linkStyle" to="/">
          Home
        </Link>
        <i className="home icon white"></i>
        <span> | </span>
        <Link className="linkStyle" to="/breweries">
          Breweries
        </Link>
        <i className="beer icon yellow"></i>
        <span> | </span>
        <Link className="linkStyle" to="/weather">
          Weather
        </Link>
        <i className="sun icon gold"></i>
        <span> | </span>
        <Link className="linkStyle" to="/lookupmusicband">
          Lookup Music Band
        </Link>
        <i className="headphones icon red"></i>
      </span>
      <span className='columnStyle'>
          <LocationData/>
      </span>
    </header>
  );
};

export default Header;
