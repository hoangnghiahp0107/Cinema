import React, {useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";
import Seat from './Seat/Seat';
import {getTicket} from '../../slices/ticketSlice'
import './BookingTicket.scss';
import SeatSelect from './SeatSelect/SeatSelect';

function BookingTicket() {
  // lấy bookingID từ react-dom
  const {bookingID} =  useParams();
  // lấy user từ redux để check
  const {user} = useSelector((state) => state.user);

  // gửi bookingID để lấy ds vé của phòng vé
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTicket(bookingID))
  },[bookingID])

  // lấy danh sách ghế từ redux về render giao diện
  // const {danhSachGhe,thongTinPhim} = useSelector((state) => state.ticket);
  
  if(user) {
      return (
        <div className="movie">
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h1 className='text-center text-warning my-4'>ĐẶT VÉ XEM FILM</h1>
                      <h4 className='text-center text-light'>Màn hình</h4>
                      <div className="screen"></div>
                      <Seat />
                      <SeatSelect />
                  </div>
              </div>
          </div>
        </div>
      )
  } else return (
    <div className='text-center text-danger'>
        <h3>Vui lòng đăng nhập để đặt vé</h3>
    </div>
  )
}

export default BookingTicket