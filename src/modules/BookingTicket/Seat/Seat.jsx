import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {seat_book, seat_remove} from '../../../slices/ticketSlice';
import style from './Seat.module.scss';

function Seat() {
const {danhSachGhe,isLoading, error} = useSelector((state) => state.ticket);
const dispath = useDispatch();
const rows = [];
  for (let i = 0; i < danhSachGhe?.length; i += 16) {
    const row = danhSachGhe?.slice(i, i + 16);
    rows.push(row);
  }

const book = (seat) => {
    if(seat.dangChon) dispath(seat_remove(seat))
    else dispath(seat_book(seat))
}

if(isLoading) return (
    <div className="h-100vh d-flex justify-content-center align-items-center">
      <img src='img/loading.gif' alt="" />
    </div>
  )

  return (
    <div className='mt-5 m-auto seat'>
        {rows?.map((row,index) => {
            return(
            <div key={index} className='d-flex flex-wrap justify-content-center'>
                {row.map((seat,index) => {
                    return <button disabled={seat.daDat? true : false}
                                key={index} 
                                className={`
                                    ${style.seatItem}
                                    ${seat.daDat ? style.daDat : ''}
                                    ${seat.dangChon ? style.dangChon : ''}
                                    ${seat.loaiGhe === 'Thuong' ? style.veThuong : style.veVip}
                                    `}
                                onClick={() => book(seat)}
                            >
                                {seat.tenGhe}
                            </button>
                })}
            </div>
            )
        })}
        <div className={style.loaiGhe}>
            <div className={style.seatType}>
                <p className={style.daDat}></p>
                <span>Đã đặt</span>
            </div>
            <div className={style.seatType}>
                <p className={style.dangChon}></p>
                <span>Ghế bạn chọn</span>
            </div>
            <div className={style.seatType}>
                <p className={style.veThuong}></p>
                <span>Ghế thường</span>
            </div>
            
            <div className={style.seatType}>
                <p className={style.veVip}></p>
                <span>Ghế VIP</span>
            </div>
        </div>
    </div>
  )
}

export default Seat