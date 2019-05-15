import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import PokeSearchBar from './components/layout/PokeSearchBar';
import PokemonGrid from './components/layout/PokemonGrid';
import PokemonPage from './components/layout/PokemonPage';
import {Route} from 'react-router-dom'
import '../style/pokemon.css'

class Pokedex extends Component {
    render(){
        return(
            <div>
                <Route exact path="/pokedex" component={PokemonPage}/>
            </div>
        );
    }
}
