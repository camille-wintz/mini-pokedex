import 'space-lift/commonjs/all'
import * as React from "react";
import { connect } from 'react-redux';
import lift, { ArrayOps } from 'space-lift'
import lifecycle from 'react-pure-lifecycle';

import Search from './Search';
import Results from './Results';
import { AppState } from '../reducers/AppState';
import { resetPokemon } from '../actionsCreators/pokemon';

import '../Pokedex.scss';

const hooks = {
    componentDidMount: ({ resetPokemon }) => {
        resetPokemon()
    }
}

const templates = [
    {
        match: search => search.text.length === 0,
        render: i => <div className="screen" key={i}>Search for a Pokemon</div>
    },
    {
        match: search => search.text.length > 0,
        render: i => <Results key={ i } />
    }
]

const Pokedex = ({ search }) => (
    <div className="pokedex">
        <section className="pokedex-left">
            <header className="pokedex-button" />
            { lift(templates)
                .filter(t => t.match(search))
                .map((t, i) => t.render(i))
                .value()
            }
        </section>
        <section className="pokedex-right">
            <header />
            <Search />
        </section>
    </div>
);

export default connect(
    (state: AppState) => ({
        search: state.search
    }),
    dispatch => ({
        resetPokemon: resetPokemon(dispatch)
    }),
)(
    lifecycle(hooks)(Pokedex)
)