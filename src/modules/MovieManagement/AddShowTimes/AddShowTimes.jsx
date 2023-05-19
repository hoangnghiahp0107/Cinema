import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {useLocation} from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {apiGetListHeThongCumRap, apiGetCinema, apiTaoLichChieu} from '../../../apis/movieAPI';
import './AddShowTimes.scss';

// định nghĩa các xác thực input
const schema = yup.object({
    maPhim: '',
    giaVe: yup.number().typeError('Giá vé phải là số').required("Giá vé không được để trống"),
    maRap: yup.string().required("Mã rạp không được để trống"),
    ngayChieuGioChieu: yup.string().required("Ngày chiếu giờ chiếu không được để trống"),
  });

function AddShowTimes() {
    // lấy bookingID từ react-dom
  const {state} =  useLocation();
  const {register,handleSubmit,formState: { errors }} = useForm({mode: "onTouched",resolver: yupResolver(schema),});
  const [listHeThongCumRap, setListHeThongCumRap] = useState(null);
  const [heThongRap, setHeThongRap] = useState(null);
  const [listCumRap, setListCumRap] = useState(null);
  const [lichChieu, setLichChieu] = useState(null);
  console.log(lichChieu);
  const [error, setError] = useState(null);
  console.log(error);


  // error form
  function onErrer(err) {
    console.log(err);
  }
//lấy danh sách hệ thống rạp
  const getListHeThongCumRap = async () => {
    try{
        const {content} = await apiGetListHeThongCumRap();
        setListHeThongCumRap(content);
    }catch (err) {
        setError(err.response?.data?.content)
    }
  };

  useEffect(() => {
    getListHeThongCumRap();
  }, []);

  const handelHeThongCumRap = (evt) => {
    setHeThongRap(evt.target.value);
  }
//khi có hệ thống rạp lấy ds cụm rạp
  const getCinema = async (heThongRap) => {
    try{
        const {content} = await apiGetCinema(heThongRap);
        setListCumRap(content[0].lstCumRap);
    }catch (err) {
        setError(err?.response?.data?.content)
    }
  };

  useEffect(() => {
    getCinema(heThongRap);
  }, [heThongRap]);

  const onSubmit = async (value) => {
    const payload = {...value, maPhim: state?.movie.maPhim};
    await console.log(payload);
    try {
      const data = await apiTaoLichChieu(payload);
      setLichChieu(data);
    } catch (error) {
        setError(error);
    }
  };

    // error form
    function onErrer(err) {
        console.log(err);
      }

  return (
    <div className='addShowTimes'>
        <h2>Tạo lịch chiếu phim - {state?.movie.tenPhim}</h2>
        <div className="body">
            <div className="container">
                <div className="row">
                    <div className="col-3 p-3">
                        <img src={state?.movie.hinhAnh} alt={state?.movie.biDanh} className='imgLeft'/>
                    </div>
                    <div className="col-9">
                        <div className="row mb-3 mt-3 align-items-center">
                            <div className="col-2 text-end">Hệ thống Rạp: </div>
                            <div className="col-10">
                                <select class="form-select" onChange={handelHeThongCumRap}>
                                    <option selected>Chọn hệ thống rạp</option>
                                    {listHeThongCumRap?.map((item, index)=> {
                                        return <option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
                            <div className="row mb-3 align-items-center">
                                <div className="col-2 text-end">Cụm rạp: </div>
                                <div className="col-10">
                                    <select class="form-select" disabled={heThongRap ? false : true} {...register("maRap")}>
                                        <option selected>Chọn cụm rạp</option>
                                        {listCumRap?.map((item, index)=> {
                                            return <option key={index} value={item.maCumRap}>{item.tenCumRap}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            {errors.maRap && (
                                <p className="ms-3 fs-7 text-danger fst-italic">
                                {errors.maRap.message}
                                </p>)}

                            <div className="row mb-3 align-items-center">
                                <div className="col-2 text-end">Ngày giờ chiếu: </div>
                                <div className="col-10">
                                    <input type="text" class="form-control" placeholder="Ngày giờ chiếu ..." {...register("ngayChieuGioChieu")}></input>
                                </div>
                            </div>
                            {errors.ngayChieuGioChieu && (
                                <p className="ms-3 fs-7 text-danger fst-italic">
                                {errors.ngayChieuGioChieu.message}
                                </p>)}

                            <div className="row mb-3 align-items-center">
                                <div className="col-2 text-end">Giá vé: </div>
                                <div className="col-10">
                                    <input type="text" class="form-control" placeholder="Giá vé ..." {...register("giaVe")}/>
                                </div>
                            </div>
                            {errors.giaVe && (
                                <p className="ms-3 fs-7 text-danger fst-italic">
                                {errors.giaVe.message}
                                </p>)}

                            <div className="row mb-3 me-3 justify-content-end">
                                <button className='btnPrimary'>Tạo lịch chiếu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    </div>
  )
}

export default AddShowTimes