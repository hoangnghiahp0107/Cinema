
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {dsPhimPhanTrang} from '../../slices/danhSachPhimPhanTrangSlide';
import {useNavigate } from 'react-router-dom';
import Pagination from 'rc-pagination';
import MovieForm from './MovieForm/MovieForm';
import {apiXoaPhim} from '../../apis/movieAPI';
import './MovieManagement.scss';


function MovieManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  
  //value input to search by movie name
  const [inputValue, setInputValue] = useState(null);
  console.log(inputValue);
  const [current, setCurrent] = useState(1);
  const handleInput = evt => {
    console.log(evt.target);
    if (evt?.key === 'Enter' || evt?.key === 'Tab') {
      setInputValue(evt?.target?.value);
    }
  }

  const {dataMovies, isLoading, error} = useSelector((state) => state.listMoviePage);
  console.log(dataMovies.count);
  useEffect(() => {
    dispatch(dsPhimPhanTrang({soTrang: current, soPhanTuTrenTrang:10, tenPhim: inputValue ? inputValue : null}))
  },[current, inputValue]);

  // cài đặt Pagination
  const PaginationChange = (page) => {
      setCurrent(page);
  }
const [dataMovieDetail, setDataMovieDetail] = useState('')
const handleUpdateMovie = (index) => {
  setDataMovieDetail(dataMovies?.items[index]);
  setShow(true);
}
//xóa phim
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
if(deleteMovie?.statusCode === 200) {
  swal({
      title: `Bạn đã xóa phim thành công`,
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
      })
      .then((willSuccess) => {
        setDeleteMovie(null);
      if (willSuccess) {
        window.location.reload(false);
      } 
      });
  }
//hiện modal
const handleShow = (value) => {
  setShow(value);
}
//chuyển page thêm lịch chiếu
const handleAddShowTimes = (value) => {
  navigate('addshowtimes', {state: {movie: value}});
}

  if (isLoading)
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <img
          src={"/img/loading.gif"}
          className="img-fluid"
          style={{ height: "100px", width: "100px" }}
        />
      </div>
    );

  return (
    <div className="movieManagement">
      <h2>Quản lý phim</h2>

      <div className="d-flex justify-content-around">
        <div className="input-group w-50">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Nhập tên phim và nhấn Enter..." 
            name="inputValue"
            // value={inputValue}
            onKeyDown={handleInput}
            // onChange={(event)=>setInputValue(event.target.value)}
            />
          {/* <span className="input-group-text enable-button-pointers" value='Enter' onClick={handleInput}><i value='Enter' class="bi bi-search"></i></span> */}
        </div>
        <button className='btn btn-pink-primary text-bg-light-color' onClick={() => navigate('/admin/addmovies')}>Thêm phim</button>

      </div>
      <div className='body'>

        <div className="container">
          <div className="row">
            <table className="table">
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
                      <th scope="row">{index + 1 + (current - 1) * 10}</th>
                      <td>{item.maPhim}</td>
                      <td>
                        <img src={item.hinhAnh} alt={item.biDanh} />
                      </td>
                      <td>{item.tenPhim}</td>
                      <td>{item.moTa}</td>

                      <td className=''>
                        <div className="d-flex">
                          <button onClick={()=>handleUpdateMovie(index)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                          <button onClick={()=>handleDeleteMovie(item.maPhim)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                          <button onClick={()=>handleAddShowTimes(item)} className='btn text-success'> <i class="bi bi-calendar2"></i></button>
                        </div>

                      </td>
                    </tr>
                  );
                })}

                {!dataMovies?.count && <p>Không tìm thấy phim</p> }
              </tbody>
            </table>
            {/* dùng thư viện pagination cho lẹ
              npm i rc-pagination
              https://pagination-react-component.vercel.app/ */}
            <Pagination
              className="pagination"
              // showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
              onChange={PaginationChange}
              total={dataMovies.totalCount % 10 == 0 ? dataMovies.totalPages -1 : dataMovies.totalPages

              }
              // ko thể thiếu current
              current={current}
              pageSize={1}
            />
          </div>
        </div>
      </div>

      <MovieForm
        onShow={show}
        handleShow={handleShow}
        onDataMovieDetail={dataMovieDetail}
      />
    </div>
  );
}

export default MovieManagement;
