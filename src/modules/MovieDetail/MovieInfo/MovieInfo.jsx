import React, {useState, useEffect} from 'react'
import { apiGetMovieDetails } from '../../../apis/movieAPI'
import BtnPlay from "../../../components/Button/BtnPlay/BtnPlay";
import Card from 'react-bootstrap/Card';
import LinesEllipsis from 'react-lines-ellipsis';
import "./MovieInfo.scss";

function MovieInfo({movieID}) {
  const [movie, setMovie] = useState({})
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const getMovieDetails = async()=>{
    try {
      const data = await apiGetMovieDetails(movieID);
      setMovie(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getMovieDetails();
  },[]);

  return (

    <div className='cinema-header' >
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
                <div className="cinema-item">
                  <Card.Img variant="top" className="incomingMovieImg" src={movie.hinhAnh} alt={movie.biDanh}/>
                    {movie.hot && <img className="hotMovies" src="https://cse.tlu.edu.vn/Portals/0/icon-hot.png" alt="" />}
                    <div className="playTrailerMovie">
                      {(movie.trailer) && <BtnPlay wh={'50'} urlMovie={movie.trailer}/>}
                    </div>
                </div>
          </div>
          <div className="col-sm-6 cinema-right">
            <h1 className='text-white tenPhim mt-2'>{movie.tenPhim}</h1>
            <h3 className='danhGia mt-2'>Đánh giá</h3>
            <div className="row mb-3">
              <div className='col-sm-1'>
                <i class="bi bi-star-fill icon"></i>
              </div>
              <div className="col-sm-9 score">
                <strong className='text-white'>{movie.danhGia}</strong>
                <span className='text-white'>/10</span>
              </div>
            </div>
            <h3 className='text-white noiDung'>Nội dung</h3>
            {showFullDescription ? (
            <div>
              <p className='moTa text-white'>{movie.moTa}</p>
              <span className='text-yellow-300 pl-1' onClick={toggleShowFullDescription}>Thu gọn</span>
            </div>
          ) : (
            <div>
              <LinesEllipsis
                className='moTa text-white'
                text={movie.moTa}
                maxLine={showFullDescription ? '50' : '1'}
                ellipsis='...'
                trimRight
                basedOn='letters'
              />
              <span className='text-yellow-300 pl-1' onClick={toggleShowFullDescription}>Xem thêm</span>
            </div>
          )}

            <div style={{color:"#7d7d7d"}} className='ngayChieu mt-3 text-opacity-50'>Ngày chiếu</div>
            <div className='text-white mt-2'>{movie.ngayKhoiChieu}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieInfo