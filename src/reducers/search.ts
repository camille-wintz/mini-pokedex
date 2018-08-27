import 'space-lift/commonjs/all'
import lift, { ArrayOps } from 'space-lift'

export const found = (state, action) => ({
    ...state,
    found: lift(action.pokedex.data as Array<any>)
        .filter(
            p => p.name.indexOf(state.text) !== -1
        )
        .value()
});

export const update = (searchState, action) => ({
    ...searchState,
    text: action.search
});

export const reset = (searchState, action) => ({
    ...searchState,
    text: '',
    found: []
});

export const initial = () => ({
    loading: false,
    text: '',
    found: undefined
});

export const name = 'search';