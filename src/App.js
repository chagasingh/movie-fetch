import React, { useState,useEffect, useCallback } from 'react';

import MoviesList from './components/MovieList';
import './App.css';
import AddMovie from './components/AddMovie';

let deletemovie=[]

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError] = useState(null)

  const fetchMoviesHandler=useCallback(async()=> {
    setIsLoading(true)
    setError(null)
    try{
      const response =await fetch('https://react-movie-c353a-default-rtdb.firebaseio.com/movies.json')
      if(!response.ok){
        throw new Error('something went wrong...Retring')
      }

      const data=await response.json();
      const LoadedMovies=[];
      for(const key in data){
        LoadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate,
        });
      }
        setMovies(LoadedMovies);
        deletemovie=LoadedMovies
        
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

  async function addMovieHandler(movie) {
    console.log(movie)
    const response= await fetch("https://react-movie-c353a-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });
    const data=await response.json();
    console.log(data);
  }

  async function removeMovieHandler(movie) {
    console.log(deletemovie[0].id)
    const response= await fetch(`https://react-movie-c353a-default-rtdb.firebaseio.com/movies/${deletemovie[0].id}.json`, {
      method: "DELETE",
    });
 
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
        {!isLoading && <MoviesList movies={movies} onDelete={removeMovieHandler}/>}
        {!isLoading && error && <h3>{error}</h3>}
        {isLoading && <h1>Loading...</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
