import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AdminAddUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateUser } from "../../slices/createUserSlice";
import swal from "sweetalert";
//Định nghĩa các xác thực input
const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống."),
  matKhau: yup
    .string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Mật khẩu phải có ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số."
    ),
  email: yup.string().required("Email không được để trống."),
  soDt: yup
    .string()
    .required("Số điện thoại không được để trống.")
    .matches(
      /^0[1-9]\d{8,}$/,
      "Số điện thoại phải là dãy số bắt đầu là 0 và ít nhất 10 chữ số"
    ),
  maLoaiNguoiDung: yup.string().required("Loại người dùng không được để trống"),
  hoTen: yup.string().required("Họ tên không được để trống"),
});
function AdminAddUser() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.createUser);
  const [addUser, setAddUser] = useState(null);
  const [err, setErr] = useState(null);

  const onSubmit = async (value) => {
    console.log(value);
    dispatch(adminCreateUser(value));
  };

  user &&
    swal("Đã thêm người dùng thành công", "You clicked the button!", "success");
  if (isLoading)
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <img src="img/loading.gif" alt="" />
      </div>
    );
  return (
    <div className="createUser">
      <h2>Thêm người dùng mới</h2>
      <div className="body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row mb-2 mt-2 align-items-top">
              <div className="col-2 text-end">Họ & tên</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("hoTen")} />
                {errors.hoTen && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.hoTen.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top">
              <div className="col-2 text-end">Tài khoản</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100"
                  {...register("taiKhoan")}
                />
                {errors.taiKhoan && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.taiKhoan.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top">
              <div className="col-2 text-end">Mật khẩu</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("matKhau")} />
                {errors.matKhau && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.matKhau.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top">
              <div className="col-2 text-end">Email</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("email")} />
                {errors.email && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top">
              <div className="col-2 text-end">Số điện thoại</div>
              <div className="col-10">
                <input type="text" className="w-100" {...register("soDt")} />
                {errors.soDt && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.soDt.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top">
              <div className="col-2 text-end">Loại người dùng</div>
              <div className="col-10">
                <select name="mySelect" {...register("maLoaiNguoiDung")}>
                  <option value="KhachHang">Khách hàng</option>
                  <option value="QuanTri">Quản trị</option>
                </select>
                {errors.maLoaiNguoiDung && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.maLoaiNguoiDung.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-center">
              <button className="add">Thêm người dùng</button>
              {error && (
                <p className="text-center fs-7 text-danger fst-italic">
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddUser;
