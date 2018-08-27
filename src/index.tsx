
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import pkmn from './reducers'
import Pokedex from './Pokedex/Pokedex';
import PokemonPage from './PokemonPage/PokemonPage';

import "App.scss";

const store = createStore(pkmn)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="app">
                <Route exact path="/" component={ Pokedex } />
                <Route path="/pokemon/:pokemonName" component={ PokemonPage } />
            </div>
        </Router>
    </Provider>, document.getElementById('root')
);