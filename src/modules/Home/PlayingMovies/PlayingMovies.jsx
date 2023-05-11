import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination, Navigation } from "swiper";

import BtnPlay from "../../../components/Button/BtnPlay/BtnPlay";
// api
import { apiGetMovies } from "../../../apis/movieAPI";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./PlayingMovies.scss";

// import required modules

function PlayingMovies() {
  // các hook state để báo lỗi và lưu phim
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // call API get Movie và filter đang chiếu
  const getMovies = async () => {
    try {
      const data = await apiGetMovies();
      setMovies((data.content).filter((item) => {
        return item.dangChieu === true;
      }));
    } catch (err) {
      console.log(err);
      setErr(err)
    }
  };

  useEffect(() => {
    getMovies();
  },[]);

  // nếu có lỗi thì return ko hiện
  if(err) return null;
  return (
    <div className='bg-black playingMovies'>
      <div className='container px-5'>
        <div className="mb-5 text-center">
          <h2 className="fs-2 text-white fw-semibold">Phim đang chiếu</h2>
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className='swiperPlayingMovies'
        >
          {movies.map((item, index) => {
            // console.log(item.trailer);
            return (
              <SwiperSlide key={item.maPhim} className="swiperPlayingMovies-slide -mx-5">
                <Card style={{ width: '18rem', backgroundColor: 'transparent'}} >
                  <div className="playingMovieHeader">
                    <Card.Img variant="top" className="playingMovieImg" src={item.hinhAnh} alt={item.biDanh} onClick={() => navigate(`/movie/${item.maPhim}`)}/>
                    <p className="numMovies">{index+1}</p>
                    {item.hot && <img className="hotMovies" src="https://cse.tlu.edu.vn/Portals/0/icon-hot.png" alt="" />}
                    <div className="playTrailerMovie">
                      {(item.trailer) && <BtnPlay wh={'50'} urlMovie={item.trailer}/>}
                    </div>
                    
                  </div>
                  <Card.Body className="text-white mt-2 p-0">
                    <a href="#" className="infoMovies text-start" onClick={() => navigate(`/movie/${item.maPhim}`)}>
                      <Card.Title className="nameMovie">
                        {item.tenPhim}
                     </Card.Title>
                      <Card.Text className="mt-1 fs-7 text-muted">
                        {(item.moTa).length>60? (item.moTa).slice(0,60)+' ...': (item.moTa)}
                      </Card.Text>
                    </a>
                    <div className="text-start">
                      <i className="bi bi-hand-thumbs-up text-success me-2"></i>
                      <span className="text-light">{item.danhGia}</span>
                    </div>
                    
                  </Card.Body>
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default PlayingMovies