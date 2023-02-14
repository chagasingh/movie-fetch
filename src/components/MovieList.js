
import React from 'react';

import Movie from './Movie';
import classes from './MovieList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          id={movie.key}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDel={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default MovieList;