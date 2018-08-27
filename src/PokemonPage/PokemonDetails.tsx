import 'space-lift/commonjs/all'
import * as React from 'react';
import { connect } from 'react-redux';
import lift, { ArrayOps } from 'space-lift'
import { AppState, PokemonState } from '../reducers/AppState';
import StatsComparator from './StatsComparator';

const PokemonDetails = ({ pokemon }: { pokemon: PokemonState }) => <section className="pokemon-details">
    <div className="pokemon-sprites">
        { 
            lift(pokemon.data.sprites)
                .toArray()
                .map((s, i: number) => <img src={ s[1] } key={ i } /> )
                .value()
        }
    </div>
    <StatsComparator />
</section>

export default connect(
    (state: AppState) => ({
        pokemon: state.pokemon
    })
)(PokemonDetails);