import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import {useLocation, useNavigate} from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {apiGetListHeThongCumRap, apiGetCinema, apiTaoLichChieu} from '../../../apis/movieAPI';
import './AddShowTimes.scss';

// định nghĩa các xác thực input
const schema = yup.object({
    maPhim: '',
    giaVe: yup.number().max(200000, 'Đánh giá lớn nhất là 200.000đ').min(75000,'Đánh giá nhỏ nhất là 75.000đ').typeError('Giá vé phải là số').required("Giá vé không được để trống"),
    maRap: yup.string().required("Mã rạp không được để trống"),
    ngayChieuGioChieu: yup.date().min(new Date(), 'Ngày giờ chiếu phải lớn hơn thời điểm hiện tại'),
  });

function AddShowTimes() {
    const dayjs = require('dayjs');
    // lấy bookingID từ react-dom
    const {state} =  useLocation();
    const navigate = useNavigate();
    //set react form
    const {
        register,handleSubmit,setValue,formState: { errors }
    } = useForm({mode: "onTouched",resolver: yupResolver(schema)});
    const [listHeThongCumRap, setListHeThongCumRap] = useState(null);
    const [heThongRap, setHeThongRap] = useState(null);
    const [listCumRap, setListCumRap] = useState(null);
    const [lichChieu, setLichChieu] = useState(null);
    const [error, setError] = useState(null);
 
    // ========= set type date =======================
    const [startDate, setStartDate] = useState(new Date());
    // console.log('startDate: ',dayjs(startDate).format('DD/MM/YYYY HH:MM:ss'));
    // set về đúng định dạng
    useEffect(()=>{
        setValue('ngayChieuGioChieu', startDate);
    },[startDate])

  // error form
  function onErrer(err) {
    console.log(err);
  }
//   console.log('ngay gio chieu',getValues('ngayChieuGioChieu'));
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
    const payload = {...value, maPhim: state?.movie.maPhim, ngayChieuGioChieu: dayjs(startDate).format('DD/MM/YYYY HH:MM:ss')};
    try {
      const data = await apiTaoLichChieu(payload);
      setLichChieu(data);
    } catch (error) {
        setError(error);
    }
  };
    
    if(lichChieu?.statusCode === 200) {
    swal({
        title: "Bạn đã tạo lịch chiếu thành công",
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
        })
        .then((willSuccess) => {
        if (willSuccess) {
            navigate('/admin/movies');
        } 
        });
    }
    if(error) {
        navigate('/*');
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
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-10">
                                    {errors.maRap && (
                                        <p className="ms-3 fs-7 text-danger fst-italic">
                                        {errors.maRap.message}
                                        </p>)}
                                </div>
                            </div>

                            <div className="row mb-3 align-items-center">
                                <div className="col-2 text-end">Ngày giờ chiếu: </div>
                                <div className="col-10">
                                    {/* <input type="text" class="form-control" placeholder="Ngày giờ chiếu ..." {...register("ngayChieuGioChieu")}></input> */}
                                    <DatePicker
                                        // value={startDate}
                                        showIcon
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className='datePicker'
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput
                                        // {...register("ngayChieuGioChieu")}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-10">
                                    {errors?.ngayChieuGioChieu?.message && (
                                        <p className="ms-3 fs-7 text-danger fst-italic">
                                        {errors.ngayChieuGioChieu.message}
                                    </p>)}
                                </div>
                            </div>

                            <div className="row mb-3 align-items-center">
                                <div className="col-2 text-end">Giá vé: </div>
                                <div className="col-10">
                                    <input type="text" class="form-control" placeholder="Giá vé ..." {...register("giaVe")}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-10">
                                    {errors.giaVe && (
                                        <p className="ms-3 fs-7 text-danger fst-italic">
                                        {errors.giaVe.message}
                                        </p>)}
                                </div>
                            </div>

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