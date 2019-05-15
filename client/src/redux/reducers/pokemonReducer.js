export default function reducer(state = {
    pokemonList: [],
    searchedPokemon: ''
}, action)
{
    switch(action.type){
        case 'FETCHED_POKEMON': {
            return{
                ...state,
                pokemonList: action.payload
            }
        }

        case 'SEARCHED_POKEMON': {
            return{
                ...state,
                searchedPokemon: action.payload
            }
        }
        default: return state;
    }
}