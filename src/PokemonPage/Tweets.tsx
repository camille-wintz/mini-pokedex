import * as React from 'react';
import lifecycle from 'react-pure-lifecycle';

import "Tweets.scss";

const hooks = {
    componentDidUpdate: () => {
        twttr.widgets.load()
    }
}

const Tweets = ({ hashtag }) => <div className="twitter-grid">
    <a href={ `https://twitter.com/intent/tweet?button_hashtag=${hashtag}&ref_src=twsrc%5Etfw` } className="twitter-hashtag-button" data-show-count="false">
        Tweet #{hashtag}
    </a>
    <a className="twitter-timeline" href="https://twitter.com/Pokemon?ref_src=twsrc%5Etfw">
        Tweets by Pokemon
    </a>
</div>

export default lifecycle(hooks)(Tweets);