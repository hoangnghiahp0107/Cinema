import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {dsPhimPhanTrang} from '../../slices/danhSachPhimPhanTrangSlide';
import Pagination from 'rc-pagination';
import MovieForm from './MovieForm/MovieForm';
import {apiXoaPhim} from '../../apis/movieAPI';
import './MovieManagement.scss';

function MovieManagement() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // current page 
  const [current, setCurrent] = useState(1);

  const {dataMovies, isLoading, error} = useSelector((state) => state.listMoviePage);
  useEffect(() => {
    dispatch(dsPhimPhanTrang({soTrang: current, soPhanTuTrenTrang:10}))
  },[current]);

  // cài đặt Pagination
  const PaginationChange = (page) => {
      setCurrent(page);
  }
const [dataMovieDetail, setDataMovieDetail] = useState('')
const handleUpdateMovie = (index) => {
  setDataMovieDetail(dataMovies?.items[index]);
  setShow(true);
}

const [deleteMovie, setDeleteMovie] = useState(null);
const [err, setErr] = useState(null);
const handleDeleteMovie = async (movieID) => {
  try {
    const data = await apiXoaPhim(movieID);
    setDeleteMovie(data);
    dispatch(dsPhimPhanTrang({soTrang: current, soPhanTuTrenTrang:10}));
  } catch (error) {
    setErr(err);
  }
}

const handleShow = (value) => {
  setShow(value);
}

  if(isLoading) return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
    </div>
  )

  return (
    <div className='movieManagement'>
      <h2>Quản lý phim</h2>
      <button>Thêm phim</button>
      <div className='body'>
        <div className="container">
          <div className="row">
            <table className='table'>
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Mã phim</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên phim</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Hành động</th>
              </tr>
              </thead>
              <tbody>
                {dataMovies?.items?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1 + (current-1)*10}</th>
                      <td>{item.maPhim}</td>
                      <td><img src={item.hinhAnh} alt={item.biDanh} /></td>
                      <td>{item.tenPhim}</td>
                      <td>{item.moTa}</td>
                      <td className=''>
                        <button onClick={()=>handleUpdateMovie(index)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                        <button onClick={()=>handleDeleteMovie(item.maPhim)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {/* dùng thư viện pagination cho lẹ
              npm i rc-pagination
              https://pagination-react-component.vercel.app/ */}
            <Pagination 
              className='pagination'
              // showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
              onChange={PaginationChange}
              total={dataMovies.totalPages}
              // ko thể thiếu current
              current={current}
              pageSize={1}
              />
          </div>
        </div>
      </div>

    <MovieForm onShow={show} handleShow={handleShow} onDataMovieDetail={dataMovieDetail}/>
    </div>
  )
}

export default MovieManagement