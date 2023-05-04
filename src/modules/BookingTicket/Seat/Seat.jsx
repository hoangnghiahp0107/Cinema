import React from 'react';
// import data from './danhSachGhe.json'
import { useSelector, useDispatch } from 'react-redux';
import {seat_book, seat_remove} from '../reducers/moviesreducer';

function Seat() {
    const dispath = useDispatch();
    const data = useSelector((state) => (state.moviesReducer).tongGhe)
    console.log(data);
    const book = (seat) => {
        if(seat.dangChon) dispath(seat_remove(seat))
        else dispath(seat_book(seat))
    }
  return (
    <div className='w-75 m-auto mt-5'>
        {data.map((row) => {
            if(row.hang === '#') {
                return (
                    <div key={row.hang} className='d-flex justify-content-between align-items-center mt-3'>
                        <div className='text-warning fs-4 opacity-0 seat'>{row.hang}</div>
                            {(row.danhSachGhe).map((seat, index) => {
                                return (
                                    <span key={index} className='text-warning fs-4 seat text-center'>{index +1}</span>
                                )
                            })}
                    </div>
                )
            } else {
                return (
                    <div key={row.hang}  className='d-flex justify-content-between align-items-center mt-3'>
                        <div className='text-warning pe-3 fs-4 seat'>{row.hang}</div>
                            {(row.danhSachGhe).map((seat, index) => {
                                return (
                                    <button 
                                        key={seat.soGhe} 
                                        style={{
                                            backgroundColor: seat.daDat ? '#ffa008' : (seat.dangChon === true? '#248357' : '')
                                            }} 
                                        type="button" 
                                        className="btn btn-light btn-outline-secondary seatNum seat text-black"
                                        disabled={seat.daDat}
                                        onClick={() => book(seat)}
                                    >{index +1}</button>
                                )
                            })}
                    </div>
                )
            }
        })}
    </div>
  )
}

export default Seat