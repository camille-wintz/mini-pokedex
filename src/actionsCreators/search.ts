import 'space-lift/commonjs/all'
import lift, { Option } from 'space-lift'
import types from './types';
import { sync } from './pokedex';

export const search = dispatch => async (search, pokedex) => {
    dispatch({
        type: types.search.update,
        search
    })

    const data = await Option(pokedex.loading)
        .fold(
            () => sync(dispatch)(),
            async () => pokedex.data
        );

    Option(data)
        .fold(
            () => undefined,
            () => dispatch({
                type: types.search.found,
                pokedex: { data }
            })
        );
}