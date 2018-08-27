import types from './types';
import { API, POKEDEX } from '../conf';

export const sync = dispatch => async () => {
    dispatch({
        type: types.pokedex.startFetch
    })

    const response = await fetch(`${API}/pokedex/${POKEDEX}/`);
    const pokedexContent = await response.json();
    
    const newPokedex = pokedexContent.pokemon_entries.map(e => e.pokemon_species);

    dispatch({
        type: types.pokedex.fetchDone,
        data: newPokedex
    })

    return newPokedex
}