import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser } from "../../slices/infoUserSlice";
import { useNavigate} from "react-router-dom";
import style from './TicketedHistory.module.scss';

function TicketedHistory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {infoUser, isLoading, error} = useSelector((state) => state.infoUser);
    const {user} = useSelector((state) => state.user);
    useEffect(()=> {
        dispatch(getInfoUser(user?.taiKhoan));
    },[user])
    if(error) {
        navigate('/*');
    }

    if(isLoading) return (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
        </div>
      );
  return (
    <div className={style.ticketedHistory}>
        <h2>Lịch sử giao dịch</h2>
        <div className={style.body}>
            <div className='container'>
                <div className="row">
                    <ul className={style.listOrder}>
                        {infoUser?.thongTinDatVe?.map((item, index) => {
                            // console.log(item);
                        return (
                            <li className={style.detailOrder} key={index}>
                                <div className={style.header}>
                                    Mã đặt vé: {item.maVe}
                                </div>
                                <div className={style.item}>
                                    <img src={item.hinhAnh} alt="CON NHÓT MÓT CHỒNG"/>
                                    <div className={style.info}>
                                        <p className='fw-bolder'>{item.tenPhim}</p>
                                        <p>{item.ngayDat}</p>
                                        <p>{item.danhSachGhe[0].tenHeThongRap}</p>
                                        <p>{item.danhSachGhe[0].tenRap}</p>
                                        {item?.danhSachGhe.map((item, index) => {
                                        return (
                                            <span className='fs-7' key={index}>{index !== 0 && '-' } {item.tenGhe} </span>
                                        )})}
                                        <p className='fw-bolder'>{item.giaVe.toLocaleString()} đ</p>
                                    </div>
                                </div>
                            </li>
                        )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TicketedHistory;