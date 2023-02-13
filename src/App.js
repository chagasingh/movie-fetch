import React, { useState,useEffect, useCallback } from 'react';

import MoviesList from './components/MovieList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError] = useState(null)

  const fetchMoviesHandler=useCallback(async()=> {
    setIsLoading(true)
    setError(null)
    try{
      const response =await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        throw new Error('something went wrong...Retring')
      }

      const data=await response.json();

        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        
    } catch(error){
        setError(error.message);
        setTimeout(() => {
          fetchMoviesHandler();
          console.log('called   fetchMoviesHandler')
        }, 5000);
    }
    setIsLoading(false)
  },[]);

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler])

  function addMovieHandler(movie) {
    console.log('NewMovieObjAdded'+movie)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <h3>{error}</h3>}
        {isLoading && <h1>Loading...</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
