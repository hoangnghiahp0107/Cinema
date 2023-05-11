import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { seat_cancle} from '../../../slices/ticketSlice';
import {datve, booking_remove} from '../../../slices/datVeSlice';
import style from './SeatSelect.module.scss'



function SeatSelect() {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const {carts, thongTinPhim, isLoading, error} = useSelector((state) => state.ticket);
    // console.log();
    const total = carts.reduce((tol, item) => {
        return tol + item.giaVe;
    },0)
    const handleCancle = () => {
        dispath(seat_cancle());
    }
    let danhSachVe =[];
    danhSachVe = carts.map((item) => {
        return {...danhSachVe, 'maGhe': item.maGhe,'giaVe': item.giaVe}
    })

    const datVe = {
        "maLichChieu": thongTinPhim.maLichChieu,
        "danhSachVe": danhSachVe,
      }
    //   console.log('datVe.danhSachVe :',datVe.danhSachVe );
    const handlePay = () => {
        dispath( datve(datVe));
    }

    const {listTicket} = useSelector((state) => state.datve);
    // console.log('lisTicket: ',listTicket);
    // console.log('listTicket error: ',error);
    if(listTicket.length) {
        swal({
            title: "Bạn đã đặt vé thành công",
            text: "Nhấn Ok để tiếp tục!",
            icon: "success",
          })
          .then((willSuccess) => {
            if (willSuccess) {
                navigate('/info-ticketed', {state:{thongTinPhim, carts, total}});
                dispath(booking_remove());
                dispath(seat_cancle());
            } 
          });
    }
    // if(!error) dispath(seat_cancle());

    if(isLoading) return (
        <div className="h-100vh d-flex justify-content-center align-items-center">
          <img src='img/loading.gif' alt="" />
        </div>
      )
    
  return (
    <div className={`${style.seatSelect} container`}>
        <div className="col-4">
            <div className={style.infoMovie}>
                <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim} />
                <p>{thongTinPhim.tenPhim}</p>
            </div>
        </div>
        <div className="col-4 ps-5">
            <div className={style.ticketDetail}>
                <div className={style.ticketItem}>Rap: <span>{thongTinPhim.tenCumRap}</span></div>
                <div className={style.ticketItem}>Suất chiếu: <span>{thongTinPhim.gioChieu}, {thongTinPhim.ngayChieu}</span></div>
                <div className={style.ticketItem}>Phòng chiếu: <span>{thongTinPhim.tenRap}</span></div>
                {carts.length ? (
                    <div>
                        <div className={style.ticketItem}>Ghế: 
                            {carts.map((item, index) => {
                                return (
                                    <span key={index}>{index !== 0 && '-' } {item.tenGhe} </span>
                                )
                            })}
                        </div>
                        <div className='my-3'><button onClick={() => handleCancle()} className='btn btn-danger px-5'>Hủy</button></div>
                    </div>

                ) : ''}
            </div>
        </div>
        <div className="col-4 ps-5">
            <div className={style.tickPrice}>
                Tổng: <span>{total.toLocaleString()} đ</span>
                <div className={style.pay}>
                    <button 
                        className={`${style.btnPay} ${datVe.danhSachVe.length ? style.btnPay_Hover : ''}`} 
                        disabled={datVe.danhSachVe.length ? false : true} 
                        onClick={()=>handlePay()}
                        >
                            Thanh Toán
                        </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SeatSelect