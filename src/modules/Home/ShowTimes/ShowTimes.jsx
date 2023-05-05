import React, { useEffect, useState } from 'react';
import {apiGetListHeThongCumRap} from "../../../apis/movieAPI";

//my scss
import style from "./ShowTimes.module.scss";

import CumRap from './CumRap';

function ShowTimes() {
  const [err, setErr] = useState(null);

  // call API lấy thông tin hệ thống rạp (CGV) ==================
  const [lstHeThongCumRap, setLstHeThongCumRap] = useState(null);
  const [heThongCumRap, setHeThongCumRap] = useState(null);
  // console.log(lstHeThongCumRap);

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

  // trả ra mã tenCumRap nếu click chọn
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

  // info CỤM RẠP 
 
  

   // nếu có lỗi thì return ko hiện
   if(err) return null;
  return (
    <div className='container py-5'>
      <div className="mx-auto px-5">
        <div className="text-center mb-5">
          <h2 className='text-pink-primary fw-semibold fs-2'>Lịch chiếu phim</h2>
        </div>
        <div className={style.showTime}>
          <div className={`${style.header} p-3`}>
            {renderLstCumRap()}
          </div>
          <div className={style.body}>
            {heThongCumRap && <CumRap heThongCumRap={heThongCumRap}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowTimes