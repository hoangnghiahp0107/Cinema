import React, { useState, useEffect } from 'react';
// Import Swiper React components
import  {Swiper,SwiperSlide} from 'swiper/react';
import {apiGetBanners} from '../../../apis/movieAPI';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from './Banner.module.scss';
// import required modules
import {EffectFade, Autoplay, Pagination, Navigation, Controller } from "swiper";


function Banner() {
  const [banner, setBanner] = useState([]);
  // const [moviesDetail, setMoviesDetail] = useState([]);
  const [err, setErr] = useState(null);

  const getBanners = async () => {
    try{
      const {content} = await apiGetBanners();
      setBanner(content);
    }catch (err) {
      setErr(err.response?.data?.content)
    }
  };
  useEffect(() => {
    getBanners();
  }, []);

  

  if(err) return null;
  return (
    <div className={style.banner}>
      <Swiper
          rewind={true}
          // effect={"fade"}
          speed={1000}
          // spaceBetween={30}
          // centered
          pagination={{
            el: `.${style.swiper_pagination}`,
            type: 'bullets',
            bulletActiveClass: `${style.active}`,
            bulletClass: `${style.bull}`,
            clickable: true
          }}
          // autoplay={{
          //   delay: 4000,
          //   disableOnInteraction: false,
          // }}
          navigation={{
            nextEl: `.${style.nexts}`,
            prevEl: `.${style.prevs}`,
          }}
          modules={[EffectFade,Autoplay, Pagination, Navigation, Controller]}
          className={`${style.swiperBanner} container`}
        >
          {banner.map((item, index) => {
            return (
              <SwiperSlide key={item.maBanner} virtualIndex={index} className={style.swiperBanner_slide}>
                <img src={item.hinhAnh} alt={item.maBanner}/>
                <div className={style.playBanner}>
                  {/* {movieDetails(item.maPhim)} */}
                  {/* <BtnPlay wh={'100'} urlMovie={mv.maPhim} /> */}
                  
                </div>
              </SwiperSlide>

            )})}
      </Swiper>
      <div className={style.nexts}><i className="bi bi-chevron-right"></i></div>
      <div className={style.prevs}><i className="bi bi-chevron-left"></i></div>
      <div className={style.swiper_pagination}>
        <span className={style.active}></span>
      </div>

    </div>
  )
}

export default Banner