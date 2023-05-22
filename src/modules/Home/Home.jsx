import React from 'react';
import Banner from './Banner/Banner';
import SearchMovies from './SearchMovies/SearchMovies';
import PlayingMovies from './PlayingMovies/PlayingMovies';
import ShowTimes from './ShowTimes/ShowTimes';
import IncomingMovies from './IncomingMovies/IncomingMovies';

function Home() {
  return (
    <>
        <Banner/>

        <SearchMovies/>

        <PlayingMovies />

        <IncomingMovies />

        <ShowTimes />

    </>
  )
}

export default Home