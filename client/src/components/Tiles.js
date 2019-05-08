import React, {Component} from 'react';
import Breweries from './Breweries';
import LookupMusicBand from './LookupMusicBand';
import '../style/Tiles.css';

class Tiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: ''
        }
    }

    onChange = e => {
        this.setState({app: e.target.value})
    }

    AppSelector = (app) => {
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
        <div>
            <div className="masterDiv">
                <div className="appTiles">
                <select 
                    className="selector"
                    value={this.state.app} 
                    onChange={this.onChange}>
                        <option value=''>Please Select an App...</option>
                        <option value="BreweriesApp">Breweries</option>
                        <option value="LookUpMusicBand">Music artists</option>
                </select>
                {this.AppSelector(this.state.app)}
                </div>
            </div>
        </div>
        );
    }
  };
  
  export default Tiles;