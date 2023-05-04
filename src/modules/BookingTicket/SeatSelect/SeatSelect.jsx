import {React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { seat_remove} from '../reducers/moviesreducer';


function SeatSelect() {

    const dispath = useDispatch();
    const {carts} = useSelector((state) => state.moviesReducer);

    const total = carts.reduce((tol, item) => {
        return tol + item.gia;
    },0)
    const removeBook = (seat) => {
        dispath(seat_remove(seat));
    }
  return (
    <>
        <h3 className='text-center text-light mt-5'>DANH SÁCH GHẾ BẠN CHỌN</h3>
        <div className="seatStatus">
            <div className="seatDone seatBtn"></div>
            <span>Ghế đã đặt</span>
        </div>
        <div className="seatStatus mt-3">
            <div className="seatSelecting seatBtn">
            </div>
            <span>Ghế đang chọn</span>
        </div>
        <div className="seatStatus mt-3">
            <div className="seatEmpty seatBtn">
            </div>
            <span>Ghế chưa đặt</span>
        </div>
        <div className="w-75 " data-bs-scroll="true" >
            <table className="table table-bordered mt-4 text-light">
                <thead>
                    <tr>
                        <th scope="col">Số ghế</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hủy</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map((seat,index) => {
                        return (
                            <tr key={index} className='fs-6'>
                                <td >{seat.soGhe}</td>
                                <td>{(seat.gia).toLocaleString()}</td>
                                <td className='p-1 m-auto text-center'>
                                    <button
                                        type="button" 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeBook(seat)}
                                    >x</button>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Tổng</td>
                        <td colSpan="2">{total.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <button className='btn btn-success w-100'>Thanh Toán</button>
                    </tr>
                </tbody>
            </table>

        </div>
    </>
  )
}

export default SeatSelect