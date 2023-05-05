import React from 'react';
import {useParams} from 'react-router-dom'

function MovieDetail() {
  const {movieID} = useParams();
  return (
    <>
        <div>Ku nghĩa làm nhé</div>
        <div>Mã phim: {movieID}</div>
    </>
  )
}

export default MovieDetail