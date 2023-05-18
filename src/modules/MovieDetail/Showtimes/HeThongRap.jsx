import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {apiMovieHours} from "../../../apis/movieAPI";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from 'react-bootstrap';
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

//my scss
import style from "./Showtimes.module.scss";

// import required modules
import { FreeMode, Scrollbar, Mousewheel } from "swiper";

function HeThongRap({heThongCumRap,movieID}) {
    const [err, setErr] = useState(null);
    const [cumRap, setCumRap] = useState([]);
    const [lichChieu, setLichChieu] = useState(null);
    // console.log(cumRap[0]?.lstCumRap[0]);
    const navigate = useNavigate();
 
  useEffect(() =>{
    getInfoCumRap();
  },[heThongCumRap]);
  debugger

  useEffect(()=>{
    if(cumRap.length>0){
      setLichChieu(cumRap?.heThongCumRap);
    }
  })

   const getInfoCumRap = async () => {
    try {
      const data = await apiMovieHours(movieID,heThongCumRap?.maHeThongRap);
      setCumRap(data.content);
      
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  }
  const renderCumRap = () => {
    return cumRap.heThongRapChieu?.map((heThongRap,index)=>{
      console.log("heThongRap", heThongRap);
      if (heThongRap.maHeThongRap === heThongCumRap.maHeThongRap){
        return(
          <div key={index}>
            {heThongRap.cumRapChieu?.map((cumRap,index) => {
              return(
                <div className={` ${lichChieu === cumRap? style.choice : ''}`} key={index} onClick={() => setLichChieu(cumRap)}>
                <div className={style.tenCumRap}>
                <div className={style.logo}>
                    <img src={heThongRap.logo} alt={style.maCumRap}/>
                </div>
                    <div className={style.nameRap}>
                        <span>{cumRap?.tenCumRap}</span>
                        <div className={style.address}>{cumRap.diaChi}</div>
                    </div>
                <div className={style.icon}>
                  <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
                {lichChieu?.maCumRap === cumRap.maCumRap && (
                  <div className="selected-button">
                    {cumRap.lichChieuPhim?.map((lichChieuFilm, index) => (
                      <Button
                        className={`mb-2 mx-2 mt-2 ${style.times}`}
                        variant="outline-primary"
                        key={index}
                        size="sm"
                        onClick={() => navigate(`/booking/${lichChieuFilm.maLichChieu}`)}
                        >
                        {lichChieuFilm.ngayChieuGioChieu}
                      </Button>
                        ))}
                  </div>
                )}
            </div>  
              )
            })}
          </div>
        )
      }
    })
  }

  
  // nếu có lỗi thì return ko hiện
  if(err) return null;
  return (
    <div className="row">
        <div className={`${style.top}`}>
          {/* render cụm rạp CGV, Galaxy... */}
        <Swiper
           direction={"vertical"}
           slidesPerView={"auto"}
           freeMode={true}
           scrollbar={true}
           mousewheel={true}
           modules={[FreeMode, Scrollbar, Mousewheel]}
            className={style.mySwiper}
            // isactive={true}
          >
            <SwiperSlide className={style.swiper_slide}>
                {renderCumRap(cumRap)}
            </SwiperSlide>
        </Swiper>
        </div>
    </div>
  )
}

export default HeThongRap