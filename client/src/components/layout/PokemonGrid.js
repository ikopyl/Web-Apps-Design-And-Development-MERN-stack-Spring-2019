import React, {Component} from 'react';
import axios from 'axios';
import {getPokemonList} from '../redux/actions/searchPokemonActions'

class PokemonGrid extends Component{
    renderPokemon(){
        var pokemonList = this.props.pokemonReducer.pokemonList;
        return pokemonList.map((pokemon) =>{
            const value = pokemon.url;
            const parts = value.split('/');
            const picId = parts[6];
            const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picId}.png`
                if(this.props.pokemonReducer.searchedPokemon === '')
                    return(
                        <div key = {picId} className ="poke-card">
                            <p>{pokemon.name}</p>
                            <img className="pokemon-pic"alt="" src={url}/>
                        </div>
                    )
                else if(this.props.pokemonReducer.searchedPokemon.toLowerCase() === pokemon.name){
                    return(
                        <div key={picId} className="pic-card">
                            <p>{pokemon.name}</p>
                            <img className="pokemon-pic" alt="" src={url}/>
                        </div>
                    )
                }
        })
    }
}