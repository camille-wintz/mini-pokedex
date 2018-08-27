import * as React from 'react';
import lifecycle from 'react-pure-lifecycle';
import 'space-lift/commonjs/all'
import lift, { Option, ArrayOps } from 'space-lift';

import { calcStats } from '../actionsCreators/calcStats';
import { connect } from 'react-redux';
import { AppState } from '../reducers/AppState';
import Loading from '../CommonComponents/Loading';

const hooks = {
    componentDidMount: ({ pokemon, stats, calcStats, match }) => {
        calcStats(pokemon, stats);
    }
}

const Stats = ({ stats }) => <div className="stats-by-type">
    { 
        stats.map((stat, i) => <div className="stat" key={ i }>
            <h2>{ stat.type }</h2>
                {
                    lift(stat.stats).mapValues(
                        (k, v: any) => <div className="type-stat" key={ k }>
                            {v.base}({v.type}) {v.gain}% 
                        </div>
                    )
                    .toArray()
                    .value()
                }
        </div>)
    }
</div>

const StatsComparator = ({ pokemon }) => <div className="stats">
    {
        Option(pokemon.stats)
            .fold(
                () => <Loading />,
                () => <Stats stats={pokemon.stats}/>
            )
    }
</div>

export default connect(
    (state: AppState) => ({
        stats: state.stats,
        pokemon: state.pokemon
    }),
    dispatch => ({
        calcStats: calcStats(dispatch)
    })
)(
    lifecycle(hooks)(StatsComparator)
);