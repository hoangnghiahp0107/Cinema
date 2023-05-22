import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { apiCapNhatPhimUpload } from "../../../apis/movieAPI";
import { getInfoUser } from "../../../slices/infoUserSlice";
import './MovieForm.scss';

// định nghĩa các xác thực input
const schema = yup.object({
  maPhim: yup.string().required("Mã phim không được để trống"),
  tenPhim: yup.string().required("Tên phim không được để trống"),
  trailer: yup.string().required("Trailer không được để trống"),
  hinhAnh: yup.mixed()
  .test('required', "Vui lòng chọn hình ảnh", (value) =>{
    return value && value.length
  } )
  .test("fileSize", "Max size 1mb", (value, context) => {
    return typeof value ==='string' || value && value[0] && value[0].size <= 1048576;
  })
  .test("type", "Phải chọn type hình ảnh", function (value) {
    return typeof value ==='string' || value && value[0] && value[0]?.type === "image/jpeg" || value[0]?.type === "image/png";
  }),
  moTa: yup.string(),
  ngayKhoiChieu: yup.string().required("Ngày khởi chiếu không được để trống"),
  danhGia: yup.number().max(10, 'Đánh giá nhỏ nhất là 10').min(1,'Đánh giá nhỏ nhất là 1').typeError('Đánh giá phải là số từ 1 đến 10'),
  hot: yup.string(),
  dangChieu: yup.string(),
  sapChieu: yup.string(),
});

function MovieForm({ onShow, handleShow, onDataMovieDetail }) {
  //khởi tạo format data to dd/mm/yyyy
  const dayjs = require('dayjs');
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  // submit form
  const [movieUpdate, setMovieUpdate] = useState(null);
//   console.log(movieUpdate);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    // ========= set type date =======================
    const [startDate, setStartDate] = useState(new Date());
    // console.log('startDate: ', dayjs(startDate).format('DD/MM/YYYY'));
  const onSubmit = async (value) => {
    setIsLoading(true);
    const payload = {...value, hinhAnh: value.hinhAnh[0], ngayKhoiChieu:dayjs(startDate).format('DD/MM/YYYY')}
    console.log('payload ',payload);
    try {
      const data = await apiCapNhatPhimUpload(payload);
      setMovieUpdate(data);
      setIsLoading(false);
      swal({
        title: `Bạn đã cập nhật thành công phim: ${payload.tenPhim}`,
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
        })
        .then((willSuccess) => {
          if (willSuccess) dispatch(getInfoUser(user?.taiKhoan));
          handleShow(!onShow);
        });
    } catch (error) {
        setErr(error);
        setIsLoading(false);
    }
  };

  // error form
  const onErrer = (err) => {
    console.log(err);
  };

//   const [startDate, setStartDate] = useState("");

  useEffect(() => {
    reset({
      maPhim: onDataMovieDetail.maPhim,
      tenPhim: onDataMovieDetail.tenPhim,
      trailer: onDataMovieDetail.trailer,
      hinhAnh: onDataMovieDetail.hinhAnh,
      moTa: onDataMovieDetail.moTa,
      ngayKhoiChieu: onDataMovieDetail.ngayKhoiChieu,
      danhGia: onDataMovieDetail.danhGia,
      hot: onDataMovieDetail.hot,
      dangChieu: onDataMovieDetail.dangChieu,
      sapChieu: onDataMovieDetail.sapChieu,
    });
    // setStartDate(onDataMovieDetail.ngayKhoiChieu);
  }, [onDataMovieDetail]);
  console.log(watch("hinhAnh"));

   // ==========set type img =======================
 // watch là hàm dùng để theo dõi và lấy được giá trị mới của input trong form
 const [imgPreview, setImgPreview] = useState("");
 const imageField = watch("hinhAnh");
 useEffect(() => {
   if ((typeof imageField) == 'string') return
   // FileReader là một đối tượng trong JS dùng để xử lý file
   const fileReader = new FileReader();
   // readAsDataURL là phương thức dùng để chuyển file thành url để sử dụng trong thuộc tính src của thẻ img
   if(typeof imageField == 'object' && imageField[0]) {
    // console.log('obj');
     fileReader.readAsDataURL(imageField[0]);
   }
   // onload là callback để chờ sau khi xử lý xong nhận được kết quả
   fileReader.onload = (evt) => {
     setImgPreview(evt?.target.result);
   };
 }, [imageField]);

  const onChangeDate = (date) => {
    console.log("date change: ", date);
  };

  if(isLoading) return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
    </div>
  )

  return (
    <Modal
      show={onShow}
      onHide={() => handleShow(!onShow)}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header className="bg-pink-primary" closeButton>
        <Modal.Title className="text-header-border-color">
          Cập nhật thông tin phim
        </Modal.Title>
      </Modal.Header>
      {isLoading ? <div className="h-100 d-flex justify-content-center align-items-center">
            <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
        </div> 
       : <form onSubmit={handleSubmit(onSubmit, onErrer)}>
            <Modal.Body className="formBody">
            <div className="input-group input mb-3 align-items-center">
                <span className="input-group-text">Mã phim</span>
                <input
                type="text"
                className="form-control"
                disabled
                placeholder="Mã phim"
                {...register("maPhim")}
                />
            </div>
            {errors.maPhim && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.maPhim.message}
                </p>
            )}

            <div className="input-group input mb-3 align-items-center">
                <span className="input-group-text">Tên phim</span>
                <input
                type="text"
                className="form-control"
                placeholder="Tên phim"
                {...register("tenPhim")}
                />
            </div>
            {errors.tenPhim && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.tenPhim.message}
                </p>
            )}

            <div className="input-group input mb-3 align-items-center">
                <span className="input-group-text">Trailer</span>
                <input
                type="text"
                className="form-control"
                placeholder="Trailer"
                {...register("trailer")}
                />
            </div>
            {errors.trailer && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.trailer.message}
                </p>
            )}

            <div className="input-group input mb-3 ">
                <div>
                  <span className="input-group-text input_Des">Mô tả</span> 
                </div>
                <textarea className="form-control" rows="3" {...register("moTa")}>
                {getValues("moTa")}
                </textarea>
            </div>
            {errors.moTa && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.moTa.message}
                </p>
            )}

            <div className="input-group input mb-3 align-items-center">
                <span className="input-group-text">Ngày khởi chiếu</span>
                <DatePicker
                    // value={value}
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className='datePicker'
                />
                {/* <input
                type="text"
                className="form-control"
                placeholder="Tên phim"
                {...register("ngayKhoiChieu")}
                /> */}
            </div>
            {errors.ngayKhoiChieu && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.ngayKhoiChieu.message}
                </p>
            )}

            <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                {...register("dangChieu")}
                />
                <label className="form-check-label">Đang chiếu</label>
            </div>
            {errors.dangChieu && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.dangChieu.message}
                </p>
            )}

            <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                {...register("sapChieu")}
                />
                <label className="form-check-label">Sắp chiếu</label>
            </div>
            {errors.sapChieu && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.sapChieu.message}
                </p>
            )}

            <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                {...register("hot")}
                />
                <label className="form-check-label">Hot</label>
            </div>
            {errors.hot && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.hot.message}
                </p>
            )}

            <div className="input-group input mb-3 align-items-center">
                <span className="input-group-text">Số sao</span>
                <input
                type="text"
                className="form-control"
                placeholder="Số sao"
                {...register("danhGia")}
                />
            </div>
            {errors.danhGia && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.danhGia.message}
                </p>
            )}

            <img
                src={imgPreview? imgPreview : watch("hinhAnh")}
                className="text-center"
                srcset=""
                style={{ width: "100px" }}
            />
            <div className="input-group">
                <input
                className="form-control"
                type="file"
                {...register("hinhAnh")}
                />
            </div>
            {errors.hinhAnh && (
                <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.hinhAnh.message}
                </p>
            )}
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btnPrimary">
                Cập nhật
            </button>
            </Modal.Footer>
        </form>
        }
    </Modal>
  );
}

export default MovieForm;
