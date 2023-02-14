import React from 'react';
import Delete from './Delete';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie} id={props.id}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <Delete onClick={props.onDel}/>
    </li>
  );
};

export default Movie;
