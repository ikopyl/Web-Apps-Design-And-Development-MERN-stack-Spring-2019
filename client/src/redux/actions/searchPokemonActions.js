import axios from 'axios';
import { SEARCH_POKEMON } from './types';

export function getPokemonList(){
    return function (dispatch){
        return axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then(function(response){
            dispatch(FETCHED_POKEMON(response.data.results));
        })
        .catch(function(error){
            console.log(error);
        });
    }
}

function FETCHED_POKEMON(PokemonList){
    return{
        type: 'FETCHED_POKEMON',
        payload: PokemonList
    }
}