import * as React from 'react';
import { connect } from 'react-redux';
import { search } from '../actionsCreators/search';
import { AppState } from '../reducers/AppState';

import "Search.scss";

const Search = ({ search, startSearch, pokedex }) => (
    <section className="search-form">
        <input type="search" onInput={e => startSearch(e.currentTarget.value, pokedex)} autoFocus />
        <div className="loading">{ search.loading && 'Loading' }</div>
    </section>
)

export default connect(
    (state: AppState) => ({
        search: state.search,
        pokedex: state.pokedex
    }),
    dispatch => ({
        startSearch: search(dispatch)
    })
)(Search)