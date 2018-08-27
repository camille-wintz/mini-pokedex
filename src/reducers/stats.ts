import 'space-lift/commonjs/all'
import lift, { ArrayOps } from 'space-lift'

export const startFetch = (state, action) => ({
    ...state,
    loading: true
});

export const fetchDone = (state, action) => ({
    ...state,
    loading: false,
    data: action.data
});

export const typeAverage = (state, action) => ({
    ...state,
    loading: false,
    types: {
        ...state.types,
        [action.pokemonType]: action.average
    }
});

export const initial = () => ({
    types: {}
});

export const name = 'stats';