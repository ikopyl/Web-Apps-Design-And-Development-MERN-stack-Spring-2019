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
        if(e.target.value = "BreweriesApp") {
            return <Breweries />
        }else{
            return (
                <div>Test</div>
            );
        }

    }

    render() {
        return (
        <div>
            <div>
                
            </div>
            <div className="masterDiv">
                <span className="appTiles">
                <select 
                    className="selector"
                    value={this.state.app} 
                    onChange={this.onChange}>
                        <option>Please Select an App...</option>
                        <option value="BreweriesApp">Breweries</option>
                </select>
            </span>
            <span className="appTiles">
                <select 
                    className="selector"
                    value={this.state.app} 
                    onChange={this.onChange}>
                        <option>Please Select an App...</option>
                        <option value="BreweriesApp">Breweries</option>
                </select>
            </span>
            <span className="appTiles">
                <select 
                    className="selector"
                    value={this.state.app} 
                    onChange={this.onChange}>
                        <option>Please Select an App...</option>
                        <option value="BreweriesApp">Breweries</option>
                </select>
            </span>
            <span className="appTiles">
                <select 
                    className="selector"
                    value={this.state.app} 
                    onChange={this.onChange}>
                        <option>Please Select an App...</option>
                        <option value="BreweriesApp">Breweries</option>
                </select>
            </span>
            </div>
        </div>
        );
    }
  };
  
  export default Tiles;