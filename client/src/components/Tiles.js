import React, {Component} from 'react';
import Breweries from './Breweries';
import LookupMusicBand from './LookupMusicBand';
import '../style/Tiles.css';
import App from '../App';

class Tiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: ''
        }
    }


    AppSelector = (app) => {
        console.log(app)
        console.log(this.props.tileType)
        switch(app) {
            case 'BreweriesApp':
                return <Breweries />
            case 'LookUpMusicBand':
                return <LookupMusicBand />
            case '':
                return "Select an App"
        };
    }

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
        </select>
        {this.AppSelector(this.props.tileType)}
        </div>
        );
    }
  };
  
  export default Tiles;