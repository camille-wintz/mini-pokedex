import * as React from "react";
import { connect } from 'react-redux';
import lift, { Option } from 'space-lift'
import lifecycle from 'react-pure-lifecycle';
import { Link } from 'react-router-dom';

import { AppState } from '../reducers/AppState';

import Loading from '../CommonComponents/Loading';
import PokemonDetails from './PokemonDetails';
import { pick } from '../actionsCreators/pokemon';
import Tweets from "./Tweets";

const hooks = {
    componentDidMount: ({ pick, match }) => {
        pick(match.params.pokemonName)
    }
}

const PokemonPage = ({ pokemon, pick }) => {
    return <div className="pokedex">
        <div className="pokedex-left">
            <Link to="/"><header className="pokedex-button"></header></Link>
            <div className="screen">
                <h2>{ pokemon.name }</h2>
                {
                    Option(pokemon.data)
                        .fold(
                            () => <Loading />,
                            () => <PokemonDetails />
                        )
                }
            </div>
        </div>
        <div className="pokedex-right">
            <Tweets hashtag={ pokemon.name } />
        </div>
        
    </div>
};

export default connect(
    (state: AppState) => ({
        pokemon: state.pokemon
    }),
    dispatch => ({
        pick: pick(dispatch)
    }),
)(
    lifecycle(hooks)(PokemonPage)
)