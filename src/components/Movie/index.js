import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieYear from '../MovieYear';
import MovieTime from '../MovieTime';
import MovieVote from '../MovieVote';
import MoviePoster from '../MoviePoster';

import {
    getMovies,
    getBackdropBase,
    getPosterBase,
} from '../../selectors';

import {
    getImageUrl,
    formatPrice
} from '../../utils';

import './styles.css';

class Movie extends Component {

    render() {
        const {
            title,
            releaseDate,
            voteAverage,
            voteCount,
            poster,
            backdrop,
            overview,
            runtime,
            budget,
            revenue,
            imdbId,
        } = this.props;

        return (
            <div className="movie">
                <div className="movie__main-info">
                    <div
                        className="movie__backdrop"
                        style={{ backgroundImage: `url(${backdrop})` } }
                    ></div>
                    <div className="movie__content">
                        <div className="container">
                            <div className="movie__row">
                                <div className="movie__left-col">
                                    <MoviePoster
                                        poster={poster}
                                        title={title}
                                        className="movie__poster"
                                    />
                                </div>
                                <div className="movie__right-col">
                                    <MovieYear releaseDate={releaseDate} />
                                    <h2 className="movie__title">{ title }</h2>
                                    <MovieVote
                                        average={voteAverage}
                                        count={voteCount}
                                    />
                                    <MovieTime
                                        time={runtime}
                                        className="movie__time"
                                    />
                                    <div>Budget: {budget}</div>
                                    <div>Revenue: {revenue}</div>
                                    <a
                                        href={`http://www.imdb.com/title/${imdbId}`}
                                        target="_blank"
                                        className="movie__imdb-link"
                                    >
                                        Go to IMDB
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="movie__row">
                        <div className="movie__left-col">

                        </div>
                        <div className="movie__right-col">
                            <h3 className="movie__subtitle">Overview</h3>
                            <p className="movie__overview">{ overview }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    voteCount: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string,
    backdrop: PropTypes.string,
    runtime: PropTypes.number,
    budget: PropTypes.string,
    revenue: PropTypes.string,
    imdbId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    const movie = getMovies(state).get(ownProps.movieId);

    return {
        id: movie.get('id'),
        title: movie.get('title'),
        releaseDate: movie.get('release_date'),
        voteAverage: movie.get('vote_average'),
        voteCount: movie.get('vote_count'),
        overview: movie.get('overview'),
        backdrop: getImageUrl(getBackdropBase(state), movie.get('backdrop_path')),
        poster: getImageUrl(getPosterBase(state), movie.get('poster_path')),
        runtime: movie.get('runtime'),
        budget: formatPrice(movie.get('budget')),
        revenue: formatPrice(movie.get('revenue')),
        imdbId: movie.get('imdb_id'),
    }
};

export default connect(mapStateToProps)(Movie);
