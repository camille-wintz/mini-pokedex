import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'space-lift';

import { AppState } from '../reducers/AppState';
import Pokemon from './Pokemon';
import Loading from '../CommonComponents/Loading';

import "Results.scss";

const Results = ({ search }) => Option(search.found)
    .fold(
        () => <Loading />,
        () => <section className="screen">
            { search.found.map((r, i) => <Pokemon pokemon={ r } key={ i } />)}
        </section>
    )

export default connect(
    (state: AppState) => ({
        results: state.results,
        search: state.search
    }),
)(Results)