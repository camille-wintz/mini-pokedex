const types = {
    search: {
        update: 'search/update',
        reset: 'search/reset',
        found: 'search/found'
    },
    pokedex: {
        startFetch: 'pokedex/startFetch',
        fetchDone: 'pokedex/fetchDone'
    },
    pokemon: {
        pick: 'pokemon/pick',
        startFetch: 'pokemon/startFetch',
        fetchDone: 'pokemon/fetchDone',
        stats: 'pokemon/stats'
    },
    stats: {
        data: 'stats/data',
        startFetch: 'stats/startFetch',
        fetchDone: 'stats/fetchDone'
    }
}

export default types;