import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './InfoTicketed.module.scss';
 
function InfoTicketed() {
    const {thongTinPhim, carts, total} = useLocation().state; 
    const navigate = useNavigate();
  return (
    <div className='container text-center'>
        <p className='text-danger fst-italic'>Vui lòng lưu thông tin đặt vé!!!</p>
        <div className={style.infoTicketed}>
            <div className={`row `}>
                <div className="col-4">
                    <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim}/>
                </div>
                <ul className="col-8">
                    <li className='text-pink-primary'>{thongTinPhim.tenPhim}</li>
                    <li>{thongTinPhim.tenCumRap}</li>
                    <li>{thongTinPhim.diaChi}</li>
                    <li>{thongTinPhim.tenRap}</li>
                    <li>{thongTinPhim.ngayChieu}</li>
                    <li>{thongTinPhim.gioChieu}</li>
                    <li>{total.toLocaleString()} đ</li>
                    <li>Ghế: <span className='text-pink-primary'>
                        {carts.map((item, index) => {
                                    return (
                                        <span key={index}>{index !== 0 && '-' } {item.tenGhe} </span>
                                    )
                                })}
                    </span>
                    </li>
                </ul>
                <button 
                    className='btn btn-primary w-25'
                    onClick={() => navigate('/')}
                >Về trang chủ</button>
            </div>
        </div>
    </div>
  )
}

export default InfoTicketed