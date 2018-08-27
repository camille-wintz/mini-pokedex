import 'space-lift/commonjs/all';
import lift, { Option } from 'space-lift'
import * as stats from './stats';
import * as search from './search';
import * as pokedex from './pokedex';
import * as pokemon from './pokemon';

const reducers = () => ([pokedex, pokemon, stats, search])

const initialState = reducers().reduce((acc, el) => {
    acc[el.name] = el.initial();
    return acc;
}, {});

const reducerName = type => type.split('/')[0];
const actionName = type => type.split('/')[1];
const reducerByName = action => lift(reducers())
    .find(r => r.name === reducerName(action.type));

const pkmn = (state = initialState, action) => reducerByName(action)
    .fold(
        () => state,
        () => ({
            ...state,
            [reducerName(action.type)]: reducerByName(action).get()[actionName(action.type)](
                state[reducerName(action.type)], action
            )
        })
)

export default pkmn