import * as React from 'react';
import { Link } from 'react-router-dom';

const Pokemon = ({ pokemon }) => <div className="pokemon">
    <Link to={ `/pokemon/${pokemon.name}` }>
        { pokemon.name }
    </Link>
</div>

export default Pokemon;