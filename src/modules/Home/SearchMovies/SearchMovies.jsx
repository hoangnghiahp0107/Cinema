import React , { useState, useEffect }from 'react';
import './SearchMovies.scss';
import {useNavigate} from 'react-router-dom';
import {apiGetMovies, apiMovieHours} from '../../../apis/movieAPI';

function SearchMovies() {
    const dayjs = require('dayjs');
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
    const [movies, setMovies] = useState([]);
      // call API get Movie và filter đang chiếu
    const getMovies = async () => {
        try {
        const data = await apiGetMovies();
        setMovies(data.content);
        } catch (err) {
        console.log(err);
        setErr(err)
        }
    };

    useEffect(() => {
        getMovies();
    },[]);

    const [maPhim, setMaPhim] = useState(null);
    const handleCinema = (evt) => setMaPhim(evt.target.value);

    const [lichChieu, setLichChieu] = useState(null);
    // console.log(lichChieu);
    const movieHours = async (value) => {
        try {
        const data = await apiMovieHours(value);
        setLichChieu(data.content);
        } catch (err) {
        console.log(err);
        setErr(err)
        }
    };

    useEffect(() => {
        if(maPhim) movieHours(maPhim);
    },[maPhim]);

    const lichChieuTungRap = []
    lichChieu?.heThongRapChieu.map((obj)=>obj.cumRapChieu.map((item) => lichChieuTungRap.push(item)))

    const [timeShow, setTimeShow] = useState(null);
    const handleTime = evt => setTimeShow(JSON.parse(evt.target.value));

    const [bookID, setBookID] = useState(null);
    // console.log(bookID);
    const handleBook = evt => setBookID(evt.target.value);

  // nếu có lỗi thì return ko hiện
  if(err) return null;

    return (
    <div className="searchMovies">
        <div className='container'>
            <div className="row px-5">
                <div className="col-4">
                    <select class="form-select" onChange={handleCinema}>
                        <option selected>Chọn phim...</option>
                        {movies?.map((item, index) => {return (
                            <option 
                                key={index} 
                                value={item.maPhim}
                            >{item.tenPhim}</option>
                        )})}

                    </select>
                </div>
                <div className="col-3">
                    <select class="form-select" disabled={lichChieuTungRap?.length ? false : true} onChange={handleTime}>
                        <option selected>Chọn rạp...</option>
                        {lichChieuTungRap?.map((obj, index) => {
                            return (
                                <option key={index} value={JSON.stringify(obj.lichChieuPhim)}>{obj.tenCumRap}</option>
                            )})}
                        </select>
                </div>
                <div className="col-3">
                    <select class="form-select" disabled={timeShow?.length ? false : true} onChange={handleBook}>
                        <option selected>Chọn Ngày giờ chiếu...</option>
                        {timeShow?.map((obj, index) => {
                            return (
                                <option key={index} value={(obj.maLichChieu)}>
                                    <span>{dayjs(obj.ngayChieuGioChieu).format('DD/MM/YYYY')}</span>
                                    <span>~</span>
                                    <span className='text-pink-primary'>{dayjs(obj.ngayChieuGioChieu).format('hh:mm')}</span>
                                </option>
                            )})}
                    </select>
                </div>
                <div className="col">
                    <button className='btn' onClick={() => navigate(`/booking/${bookID}`)}>Mua vé</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchMovies