export interface SearchState {
    loading: boolean
}

export interface ResultsState {
    found: []
}

export interface PokedexState {
    data: { name: string, url: string }[]
}

export interface PokemonState {
    name: string,
    data: {
        sprites: { [key: string]: never }
    }
}

export interface StatsState {
    data: []
}

export interface AppState {
    search: SearchState,
    results: ResultsState,
    pokedex: PokedexState,
    pokemon: PokemonState,
    stats: StatsState
}