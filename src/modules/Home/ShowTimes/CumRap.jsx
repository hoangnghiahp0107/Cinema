import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {apiGetCinema} from "../../../apis/movieAPI";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

//my scss
import style from "./ShowTimes.module.scss";

// import required modules
import { FreeMode, Scrollbar, Mousewheel } from "swiper";

function CumRap({heThongCumRap}) {
    const [err, setErr] = useState(null);
    const [cumRap, setCumRap] = useState([]);
    const [lichChieu, setLichChieu] = useState(null);
    // console.log(cumRap[0]?.lstCumRap[0]);
    const navigate = useNavigate();
  const getInfoCumRap = async () => {
    try {
      const data = await apiGetCinema(heThongCumRap?.maHeThongRap);
      setCumRap(data.content);
      
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  }
  useEffect(() =>{
    getInfoCumRap();
  },[heThongCumRap]);

  useEffect(() =>{
    setLichChieu(cumRap[0]?.lstCumRap[0]);
    // console.log(cumRap[0]?.lstCumRap[0]);
  },[cumRap]);


  const renderCumRap = (obj) => {
    return obj[0]?.lstCumRap?.map((item, index) => {
        // console.log(item);
        return (
            <div className={`${style.tenCumRap} ${lichChieu === item? style.choice : ''}`} key={index} onClick={() => setLichChieu(item)}>
                <div className={style.logo}>
                <img src={obj[0]?.logo} alt={style.maCumRap}/>
                </div>
                <div className={style.nameRap}><span>{item?.tenCumRap}</span></div>
                <div className={style.icon}><i className="bi bi-chevron-right"></i></div>
            </div>
        )

    })
  }
  
  // nếu có lỗi thì return ko hiện
  if(err) return null;
  return (
    <div className="row">
        <div className={`${style.left} col-4`}>
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
                <div className={style.searchCinema}>
                <input type="text" className={style.form} placeholder="Tìm theo tên rap ..." />
                <span className={style.icon}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span>
                </div>
                {renderCumRap(cumRap)}
            </SwiperSlide>
        </Swiper>
            
        </div>
        <div className={`col-8 ${style.right}`}>
          <Swiper
            direction={"vertical"}
            slidesPerView={"auto"}
            freeMode={true}
            scrollbar={true}
            mousewheel={true}
            // draggable={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            className={style.mySwiper}
          >
            <SwiperSlide className={style.swiper_slide}>
                <div className={style.right_header}>
                    <div className={style.infoRap}>
                    <div className={style.name}>Lịch chiếu phim {lichChieu?.tenCumRap}</div>
                    <div className={style.address}>{lichChieu?.diaChi}</div>
                    <div className={style.realTime}></div>
                    </div>
                </div>
                <div className={style.body}>
                    {lichChieu?.danhSachPhim?.map((item, index) => {
                        if(item.dangChieu) return (
                            <div className={`row ${style.movieDetail}`} key={index}>
                                <div className={`col-4 ${style.movieDetail_left}`}>
                                    <img onClick={()=> navigate(`/movies/${item.maPhim}`)} src={item.hinhAnh} alt="" srcset="" />
                                </div>
                                <div className={`col ${style.movieDetail_right}`}>
                                    <div className={style.movieName}>{item.tenPhim}</div>
                                    <div className={style.showTimeMovie}>
                                    <p>Thời gian chiếu</p>
                                    <div className="row">
                                        {item.lstLichChieuTheoPhim.map((timeShow, index) => {
                                          // console.log(timeShow);
                                            return(
                                                <div className="col-3 px-1" key={index}>
                                                    <div className={style.showTimeMovieDetail} onClick={() => navigate(`/booking/${timeShow.maLichChieu}`)}><span>{timeShow.ngayChieuGioChieu}</span></div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </SwiperSlide>
          </Swiper>
        </div>
    </div>
  )
}

export default CumRap