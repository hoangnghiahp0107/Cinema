import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiThemPhimUploadHinh } from '../../../apis/movieAPI';
import "./MovieAddNew.scss";

// định nghĩa các xác thực input
const schema = yup.object({
  tenPhim: yup.string().required("Tên phim không được để trống"),
  trailer: yup.string().required("Trailer không được để trống"),
  hinhAnh: '',
  moTa: yup.string(),
  ngayKhoiChieu: yup.string(),
  danhGia: yup.number(),
  hot: yup.string(),
  dangChieu: yup.string(),
  sapChieu: yup.string(),
  maPhim: yup.string(),
});

function MovieAddNew() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [movieAdd, setMovieAdd] = useState(null);
  // console.log('movieAdd: ',movieAdd);

  // từ API
  const [err, setErr] = useState(null);
  console.log('err: ',err?.response.data);

  const [isLoading, setIsLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  // watch là hàm dùng để theo dõi và lấy được giá trị mới của input trong form
  // debugger;
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

  const onSubmit = async (value) => {
    const payload = {...value, hinhAnh: value.hinhAnh[0]}
    console.log(value.ngayKhoiChieu);
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
    console.log(err);
  }
  return (
    <div className="movieAddNew">
      <h2>Thêm phim</h2>
      <div className="body">
        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
          <div className="container">
            <div className="row mb-3 mt-3 align-items-center">
              <div className="col-2 text-end">Tên Phim</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("tenPhim")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Trailer</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("trailer")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Mô tả</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("moTa")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Ngày khởi chiếu</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("ngayKhoiChieu")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Đang chiếu</div>
              <div className="col-10">
                <input class="form-check-input" type="checkbox" {...register("dangChieu")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Sắp chiếu</div>
              <div className="col-10">
                <input class="form-check-input" type="checkbox" {...register("sapChieu")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Hot</div>
              <div className="col-10">
                <input class="form-check-input" type="checkbox" {...register("hot")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Đánh giá</div>
              <div className="col-10">
                <input type="text" {...register("danhGia")}/>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-2 text-end">Hình ảnh</div>
              <div className="col-10">
                <input type="file" multiple placeholder='hinhAnh ...' {...register('hinhAnh')}/>
                <img className="imgPreview" src={imgPreview ? imgPreview : ''} alt="" />
              </div>
            </div>
            <button className="add">Thêm phim</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieAddNew;
