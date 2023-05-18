import React, {useState, useEffect} from 'react'
import { apiMovieHours, apiGetListHeThongCumRap } from '../../../apis/movieAPI';
import style from "./Showtimes.module.scss";
import HeThongRap from './HeThongRap';

function Showtimes({movieID}) {
  const [lstHeThongCumRap, setLstHeThongCumRap] = useState(null);
  const [heThongCumRap, setHeThongCumRap] = useState(null);
  const [err, setErr] = useState(null);
  const [movie,setMovie] = useState({});
  const getMovieHours = async()=>{
    try {
      const data = await apiMovieHours(movieID);
      setMovie(data.content);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };
  useEffect(()=>{
    getMovieHours();
  },[]);

  const getLstHeThongCumRap = async () => {
    try {
      const data = await apiGetListHeThongCumRap();
      setLstHeThongCumRap(data.content);
      setHeThongCumRap(data.content[0]);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  }

  useEffect(() =>{
    getLstHeThongCumRap();
  },[]);
    console.log(heThongCumRap);


  const renderLstCumRap = () => {
    return lstHeThongCumRap?.map((lstCumRap, index) => {
      return (
        <div className={style.item} key={index} onClick={() =>setHeThongCumRap(lstCumRap)}> 
          <div className={`${style.logo} ${heThongCumRap=== lstCumRap? style.choice: ''}`}>
            <img src={lstCumRap.logo} alt={lstCumRap.maHeThongRap}/>
          </div>
          <div className={style.name}>{lstCumRap.tenHeThongRap}</div>
        </div>
      )
    })
  };

  if (err) return null;
  return (
    <div className='container py-5'>
      <div className="mx-auto px-5">
        <div className="text-center mb-5">
          <h2 className='text-pink-primary fw-semibold fs-2'>Lịch chiếu phim {movie.tenPhim}</h2>
        </div>
        <div className={style.showTime}>
          <div className={`${style.header} p-3`}>
            {renderLstCumRap()}
          </div>
          <div className={style.body}>
            {movieID && heThongCumRap && <HeThongRap movieID={movieID} heThongCumRap={heThongCumRap}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showtimes