import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AdminAddUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateUser } from "../../slices/createUserSlice";
import swal from "sweetalert";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
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
  const [passShow, setPassShow] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.createUser);
  const [addUser, setAddUser] = useState(false);
  const [err, setErr] = useState(null);

  const onSubmit = async (value) => {
    const payload = { ...value, maNhom: "GP03" };
    const data = await dispatch(adminCreateUser(payload));
    setAddUser(data);
  };

  const onError = (errors) => {
    console.log(errors);
  };
  console.log(addUser);
  if (addUser?.payload?.statusCode === 200) {
    swal({
      title: "Thêm người dùng mới thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        navigate("/admin/users");
      }
    });
  }

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
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="container mb-2">
            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Họ & tên</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("hoTen")}
                />
                {errors.hoTen && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.hoTen.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Tài khoản</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("taiKhoan")}
                />
                {errors.taiKhoan && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.taiKhoan.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <spa className="col-2 text-end">Mật khẩu</spa>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  {...register("matKhau")}
                />
                {errors.matKhau && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.matKhau.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Email</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Số điện thoại</div>
              <div className="col-10">
                <input
                  type="text"
                  className="w-100 form-control"
                  {...register("soDt")}
                />
                {errors.soDt && (
                  <p className="ms-3 fs-7 text-danger fst-italic">
                    {errors.soDt.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-2 mt-2 align-items-top input-group">
              <div className="col-2 text-end">Loại người dùng</div>
              <div className="col-10">
                <select
                  className="form-control"
                  name="mySelect"
                  {...register("maLoaiNguoiDung")}
                >
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
              <button className="add" disabled={isLoading ? true : false}>
                Thêm người dùng
              </button>
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
