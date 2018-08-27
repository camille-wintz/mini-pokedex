export const startFetch = (state, action) => ({
    ...state,
    loading: true
});

export const fetchDone = (state, action) => ({
    ...state,
    loading: false,
    data: action.data
});

export const initial = () => ({});

export const name = 'pokedex';