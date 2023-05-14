import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {apiLayThongTinLichChieuPhim} from '../../apis/movieAPI';

function MovieDetail() {
  const {movieID} = useParams();
  const [lichChieu, setLichChieu] = useState(null);
  const [err, setErr] = useState(null);

  const layThongTinLichChieuPhim = async (value) => {
    try{
      const {content} = await apiLayThongTinLichChieuPhim(value);
      setLichChieu(content);
    }catch (err) {
      setErr(err.response?.data?.content)
    }
  }

  useEffect(() => {
    layThongTinLichChieuPhim(movieID);
  }, [movieID]);

  console.log(lichChieu);
  return (
    <>
        <div>Ku nghĩa làm nhé</div>
        <div>Mã phim: {movieID}</div>
        
    </>
  )
}

export default MovieDetail