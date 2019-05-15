import React, { Component } from 'react';
import Navbar from './Navbar';
import PokeSearchBar from './PokeSearchBar';
import PokemonGrid from './PokemonGrid'
import {connect} from 'react-redux';

class PokemonPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div>
                <Navbar/>
                <Searchbar {...this.props}/>
                <PokemonGrid {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        pokemonReducer: state.pokemonReducer
    }
}

export default connect(mapStateToProps)(PokemonPage);