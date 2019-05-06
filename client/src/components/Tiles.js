import React, {Component} from 'react';
import Breweries from './Breweries';
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

    render() {
        return (
            <div>
            <select 
                  value={this.state.app} 
                  onChange={this.onChange}>
                    <option>Please Select an App...</option>
                    <option value="BreweriesApp">Breweries</option>
                </select>
            <Breweries display="false"/>
            </div>
        );
    }
    
  };
  
  export default Tiles;