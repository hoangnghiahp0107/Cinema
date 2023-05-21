import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { useNavigate} from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { apiThemPhimUploadHinh } from '../../../apis/movieAPI';
import "./MovieAddNew.scss";

// định nghĩa các xác thực input
const schema = yup.object({
  tenPhim: yup.string().required("Tên phim không được để trống"),
  trailer: yup.string().required("Trailer không được để trống"),
  hinhAnh: yup.mixed()
  .test('required', "Vui lòng chọn hình ảnh", (value) =>{
    return value && value.length;
  } )
  .test("fileSize", "Max size 1mb", (value, context) => {
    return value && value[0] && value[0].size <= 1048576;
  })
  .test("type", "Phải chọn type hình ảnh", function (value) {
    return value && value[0] && value[0]?.type === "image/jpeg" || value[0]?.type === "image/png";
  }),
  moTa: yup.string(),
  ngayKhoiChieu: yup.string().required("Ngày khởi chiếu không được để trống"),
  danhGia: yup.number().max(10, 'Đánh giá lớn nhất là 10').min(1,'Đánh giá nhỏ nhất là 1').typeError('Đánh giá phải là số từ 1 đến 10'),
  hot: yup.string(),
  dangChieu: yup.string(),
  sapChieu: yup.string(),
  maPhim: yup.string(),
});

function MovieAddNew() {
  //khởi tạo format data to dd/mm/yyyy
  const dayjs = require('dayjs');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [movieAdd, setMovieAdd] = useState(null);
  console.log('movieAdd: ',movieAdd);

  // từ API
  const [err, setErr] = useState(null);
  console.log('err from API: ',err?.message);

  const [isLoading, setIsLoading] = useState(false);

  // ==========set type img =======================
  // watch là hàm dùng để theo dõi và lấy được giá trị mới của input trong form
  const [imgPreview, setImgPreview] = useState("");
  const imageField = watch("hinhAnh");
  useEffect(() => {
    if (!imageField) return;
    // FileReader là một đối tượng trong JS dùng để xử lý file
    const fileReader = new FileReader();
    // readAsDataURL là phương thức dùng để chuyển file thành url để sử dụng trong thuộc tính src của thẻ img
    if(imageField[0]) {
      fileReader.readAsDataURL(imageField[0]);
    }
    // onload là callback để chờ sau khi xử lý xong nhận được kết quả
    fileReader.onload = (evt) => {
      setImgPreview(evt?.target.result);
    };
  }, [imageField]);

  // ========= set type date =======================
  const [startDate, setStartDate] = useState(new Date());
  useEffect(()=>{
    setValue('ngayKhoiChieu', dayjs(startDate).format('DD/MM/YYYY'));
},[startDate]);


  const onSubmit = async (value) => {
    const payload = {...value, hinhAnh: value.hinhAnh[0]}
    // console.log(payload);
    try {
      const data = await apiThemPhimUploadHinh(payload);
      setMovieAdd(data);
      setIsLoading(false);
      
    } catch (error) {
        setErr(error);
        setIsLoading(false);
    }
  };
  // error form
  function onErrer(err) {
    console.log('err from form: ',err);
  }

  if(movieAdd?.statusCode === 200) {
    swal({
        title: "Bạn đã tạo thêm phim mới thành công",
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
        })
        .then((willSuccess) => {
        if (willSuccess) {
            navigate('/admin/movies');
        } 
        });
    }

  
  return (
    <div className="movieAddNew">
      <h2>Thêm phim</h2>
      <div className="body">
        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
          <div className="container">
            <div className="row mb-1 mt-3 align-items-center">
              <div className="col-2 text-end">Tên Phim</div>
              <div className="col-10">
                <input type="text" className=" form-control" {...register("tenPhim")}/>
              </div>
            </div>
            <div className="row mb-1 align-items-center">
              <div className="col-2"></div>
              <div className="col-10">
                {errors?.tenPhim && (
                   <p className="ms-3 mb-0 fs-7 text-danger fst-italic">
                   {errors.tenPhim?.message}
                   </p>
                )}
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Trailer</div>
              <div className="col-10">
                <input type="text" className=" form-control" {...register("trailer")}/>
              </div>
            </div>
            <div className="row mb-1 align-items-center">
              <div className="col-2"></div>
              <div className="col-10">
                {errors.tenPhim && (
                   <p className="ms-3 mb-0 fs-7 text-danger fst-italic">
                   {errors?.trailer?.message}
                   </p>
                )}
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Mô tả</div>
              <div className="col-10">
              <textarea className="form-control" rows="3" {...register("moTa")}>
                {/* {getValues("moTa")} */}
                </textarea>
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Ngày khởi chiếu</div>
              <div className="col-10">
                {/* <input type="text" className="w-100" {...register("ngayKhoiChieu")}/> */}
                <DatePicker
                    // value={value}
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className='datePicker'
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">
              {errors?.tenPhim && (
                   <p className="ms-3 mb-0 fs-7 text-danger fst-italic">
                   {errors?.ngayKhoiChieu?.message}
                   </p>
                )}
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Đang chiếu</div>
              <div className="col-10">
                <input class="form-check-input" type="checkbox" {...register("dangChieu")}/>
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Sắp chiếu</div>
              <div className="col-10">
                <input class="form-check-input" type="checkbox" {...register("sapChieu")}/>
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Hot</div>
              <div className="col-10">
                <input class="form-check-input" type="checkbox" {...register("hot")}/>
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div  className="col-2 text-end">Đánh giá</div>
              <div className="col-10">
                <input type="text" className="form-control" {...register("danhGia")}/>
              </div>
            </div>
            <div className="row mb-1 align-items-center">
              <div className="col-2"></div>
              <div className="col-10">
                {errors.tenPhim && (
                   <p className="ms-3 mb-0 fs-7 text-danger fst-italic">
                   {errors?.danhGia?.message}
                   </p>
                )}
              </div>
            </div>

            <div className="row mb-1 align-items-center">
              <div className="col-2 text-end">Hình ảnh</div>
              <div className="col-10">
                <input type="file" multiple placeholder='hinhAnh ...' {...register('hinhAnh')}/>
                <img className="imgPreview" src={imgPreview ? imgPreview : ''} alt="" />
              </div>
            </div>
            <div className="row mb-1 align-items-center">
              <div className="col-2"></div>
              <div className="col-10">
                {errors?.tenPhim && (
                   <p className="ms-3 mb-0 fs-7 text-danger fst-italic">
                   {errors?.hinhAnh?.message}
                   </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-2"><button className="add">Thêm phim</button></div>
              <div className="col-10">
                {err && <p>Xử lý chưa thành công, liên hệ quản trị viên</p>}
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieAddNew;
