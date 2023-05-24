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
        setMovies(data?.content);
        } catch (err) {
        console.log(err);
        // setErr(err)
        }
    };

    useEffect(() => {
        getMovies();
    },[]);

    //chọn phim
    const [maPhim, setMaPhim] = useState(null);
    // console.log(maPhim);
    const handleCinema = (evt) => {
        // console.log(evt);
        setMaPhim(evt?.target.value);
        // console.log('maPhim: ', maPhim);
        setTimeShow(null);
        setBookID(null);
        setLichChieu(null);
    }

    //lấy lịch chiếu của phim của tất cả các cụm rạp
    const [lichChieu, setLichChieu] = useState(null);
    const movieHours = async (value) => {
        try {
        const data = await apiMovieHours(value || null);
        setLichChieu(data?.content);
        setTimeShow(null);
        } catch (err) {
        console.log(err);
        // setErr(err)
        }
    };

    useEffect(() => {
        if(maPhim !== '0') {
            movieHours(maPhim);
        } else return;
    },[maPhim]);

    // lấy lịch của từng rạp bằng cách bóc tách dữ liệu từ lịch chiếu nhieuf cụm rạp
    const lichChieuTungRap = [];
    lichChieu?.heThongRapChieu?.map((obj)=>obj.cumRapChieu.map((item) => lichChieuTungRap.push(item)))

    const [timeShow, setTimeShow] = useState(null);
    const [bookID, setBookID] = useState(null);
    const handleTime = evt => {
        // console.log(evt.target.value);
        if( evt.target.value !== '0') {
            setTimeShow(JSON?.parse(evt.target.value));
            // console.log('ko');
        } else {
            setTimeShow(null);
        };
        setBookID(null);
    }

    const handleBook = evt => {
        console.log(evt.target.value);
        if( evt.target.value !== '0') {
            setBookID(evt.target.value);
        } else {
            setBookID(null);
        };
    };
    console.log(bookID);

  // nếu có lỗi thì return ko hiện
  if(err) return null;

    return (
    <div className="searchMovies">
        <div className='container'>
            <div className="row px-5">
                <div className="col-sm-4 my-2">
                    <select class="form-select" onChange={handleCinema}>
                        <option value='0' selected>Chọn phim...</option>
                        {movies?.map((item, index) => {return (
                            <option 
                                key={index} 
                                value={item.maPhim}
                            >{item.tenPhim}</option>
                        )})}

                    </select>
                </div>
                <div className="col-sm-3 my-2">
                    <select class="form-select" disabled={lichChieuTungRap?.length ? false : true} onChange={handleTime}>
                        <option value='0' selected>Chọn rạp...</option>
                        {lichChieuTungRap?.map((obj, index) => {
                            return (
                                <option key={index} value={JSON?.stringify(obj?.lichChieuPhim)}>{obj?.tenCumRap}</option>
                            )})}
                        </select>
                </div>
                <div className="col-sm-3 my-2">
                    <select class="form-select" disabled={timeShow?.length ? false : true} onChange={handleBook}>
                        <option value='0' selected={!bookID}>Chọn Ngày giờ chiếu...</option>
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
                <div className="col my-2">
                    <button className='btnBook' disabled={bookID?false:true} onClick={() => navigate(`/booking/${bookID}`)}>Mua vé</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchMovies