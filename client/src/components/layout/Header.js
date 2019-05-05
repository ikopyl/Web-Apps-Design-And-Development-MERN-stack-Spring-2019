import React from 'react';
import {Link} from 'react-router-dom';
import LocationData from '../LocationData';

const Header = () => {
  return (
    <header className="headerStyle">
      <span className="columnStyle">
        <h1>CSC 667/867 HW #3 (React)</h1>
        <Link className="linkStyle" to="/">
          Home
        </Link>
        <span> | </span>
        <Link className="linkStyle" to="/breweries">
          Breweries
        </Link>
        <span> | </span>
        <Link className="linkStyle" to="/location">
          Location
        </Link>
        <span> | </span>
        <Link className="linkStyle" to="/weather">
          Weather
        </Link>
        <span> | </span>
        <Link className="linkStyle" to="/lookupmusicband">
          Lookup Music Band
        </Link>
      </span>
      <span className='columnStyle'>
          <LocationData/>
      </span>
    </header>
  );
};

export default Header;
