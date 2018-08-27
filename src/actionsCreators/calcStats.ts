import { StatsState } from './../reducers/AppState';
import 'space-lift/commonjs/all'
import lift, { Option, ArrayOps } from 'space-lift'

import types from "./types";
import { STATS_API } from "../conf";

const extractStats = pokemon => lift(pokemon).filter((k, v) => typeof v === 'number').value()

export const fillData = dispatch => async (): Promise<any> => {
    dispatch({
        type: types.stats.startFetch
    })

    const response = await fetch(`${STATS_API}`);
    const data = await response.json();

    const pokemonTypes = lift(
            data.results.reduce((acc, el) => acc.concat(
                el.type.map(t => Option(acc[t])
                    .fold(
                        () => [t.toLowerCase(), [extractStats(el)]],
                        () => [t.toLowerCase(), [...acc[t], extractStats(el)]]
                    )
                )
            ), []) as []
        )
        .groupBy(i => i[0])
        .mapValues((k, v) => v.map(el => el[1][0]))
        .value()
        

    const typesAverage = lift(pokemonTypes)
        .mapValues((k, v) => 
            lift(
                v.reduce(
                    (acc, el) => lift(el)
                        .mapValues(
                            (key, val) => Option(acc[key])
                                .fold(
                                    () => el[key],
                                    () => acc[key] + el[key]
                                )
                            )
                        .value()
                    , {}
                )
            )
            .mapValues((prop, val) => Math.round(val as number / pokemonTypes[k].length))
            .value()
        )
        .value()

    dispatch({
        type: types.stats.fetchDone,
        data: typesAverage
    })

    return typesAverage
}

const statName = (name) => {
    const converts = [
        ['special-attack', 'sp_atk'],
        ['special-defense', 'sp_def']
    ]
    return Option(converts.find(c => c[0] === name))
        .fold(
            () => name,
            () => converts.find(c => c[0] === name)[1]
        )
}

export const calcStats = dispatch => async (pokemon, stats: StatsState) => {
    const data = await Option(stats.data)
        .fold(
            () => fillData(dispatch)(),
            async () => stats.data
        )

    const pkmnStats = pokemon.data.types.map(type => ({
        type: type.type.name,
        stats: pokemon.data.stats
            .map(s => ({ ...s, name: statName(s.stat.name) }))
            .reduce((acc, el) => {
                acc[el.name] = {
                    base: el.base_stat,
                    type: data[type.type.name][el.name],
                    gain: Math.round((el.base_stat - data[type.type.name][el.name]) * 100 / data[type.type.name][el.name])
                };
                return acc;
            }, {})
    }))

    dispatch({
        type: types.pokemon.stats,
        stats: pkmnStats
    })

}