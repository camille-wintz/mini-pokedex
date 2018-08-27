import { API } from '../conf';
import { getById, getByName } from 'pokemon-base-stats';
import types from './types';

export const resetPokemon = dispatch => () => {
    dispatch({
        type: types.pokemon.pick,
        name: undefined
    });   
}

export const pick = dispatch => async pokemonName => {
    dispatch({
        type: types.pokemon.pick,
        name: pokemonName
    });

    dispatch({
        type: types.pokemon.startFetch
    });

    const response = await fetch(`${API}/pokemon/${pokemonName}/`);
    const data = await response.json();

    dispatch({
        type: types.pokemon.fetchDone,
        data
    });
}