import React from 'react';
import { useParams } from 'react-router-dom';
import MovieInfo from './MovieInfo/MovieInfo';
import Showtimes from './Showtimes/Showtimes';

function MovieDetails() {
  const { movieID } = useParams();
  
  return (
    <>
        <MovieInfo movieID={movieID}/>
        
        <Showtimes movieID={movieID}/>
    </>
  );
}

export default MovieDetails