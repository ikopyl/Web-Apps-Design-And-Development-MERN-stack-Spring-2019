import React, {Component} from 'react';
import { searchPokemon } from '../actions/searchPokemonActions'

class Searchbar extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({valiue:event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.dispatch(searchPokemon(this.state.value));
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="searchbar">
                    <input type= "text" placeholder="Search" value={this.state.value} onChange={this.handleChange}/>
                </div>
            </form>
        )
    }
}