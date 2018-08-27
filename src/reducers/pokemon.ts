import 'space-lift/commonjs/all'
import lift, { ArrayOps } from 'space-lift'

export const stats = (state, action) => ({
    ...state,
    stats: action.stats
})

export const pick = (state, action) => ({
    name: action.name
});

export const startFetch = (state, action) => ({
    ...state,
    loading: true
});

export const fetchDone = (state, action) => ({
    ...state,
    loading: false,
    data: action.data
});

export const calcStats = (state, action) => ({
    ...state,
    stats: action.stats
})

export const initial = () => ({
    name: undefined
});

export const name = 'pokemon';