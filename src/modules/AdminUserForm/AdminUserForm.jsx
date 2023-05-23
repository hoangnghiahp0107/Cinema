import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiUpdateUser } from "../../apis/userManagementAPI";
import { useDispatch, useSelector } from "react-redux";
import style from "./AdminUserForm.module.scss";
import { userUpdated, updateUser } from "../../slices/updateUserSlice";
import swal from "sweetalert";

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
function AdminUserForm({ onShow, handleShow, onUpdateUser }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
      maNhom: "GP03",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);
  const [userUpdate, setUserUpdate] = useState(null);
  const { updated, user, error, isLoading } = useSelector(
    (state) => state.updateUser
  );

  const onSubmit = async (value) => {
    const data = await dispatch(updateUser(value));
    setUserUpdate(data);
    dispatch(userUpdated(data));
  };
  const onErr = (error) => {
    console.log(error);
  };
  useEffect(() => {
    if (onUpdateUser) {
      if (updated) {
        //cập nhật thông tin người dùng vừa cập nhật lên modal
        reset({
          hoTen: user.hoTen,
          taiKhoan: user.taiKhoan,
          matKhau: user.matKhau,
          email: user.email,
          soDt: user.soDt,
          maLoaiNguoiDung: user.maLoaiNguoiDung,
          maNhom: "GP03",
        });
      } else {
        reset({
          hoTen: onUpdateUser.hoTen,
          taiKhoan: onUpdateUser.taiKhoan,
          matKhau: onUpdateUser.matKhau,
          email: onUpdateUser.email,
          soDt: onUpdateUser.soDt,
          maLoaiNguoiDung: onUpdateUser.maLoaiNguoiDung,
          maNhom: "GP03",
        });
      }
    }
    if (updated) {
      swal(
        "Cập nhật người dùng thành công",
        "You clicked the button!",
        "success"
      );
    }
  }, [onUpdateUser]);

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
    <Modal
      show={onShow}
      onHide={() => handleShow(!onShow)}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header className="bg-pink-primary" closeButton>
        <Modal.Title className="text-header-border-color">
          Cập nhật thông tin người dùng
        </Modal.Title>
      </Modal.Header>
      {isLoading ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <img
            src={"/img/loading.gif"}
            className="img-fluid"
            style={{ height: "100px", width: "100px" }}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit, onErr)}>
          <Modal.Body className="formBody">
            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Tài khoản</span>
              <input
                type="text"
                className="form-control"
                disabled
                placeholder="Tài khoản"
                {...register("taiKhoan")}
              />
            </div>
            {errors.taiKhoan && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.taiKhoan.message}
              </p>
            )}

            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Họ & tên</span>
              <input
                type="text"
                className="form-control"
                placeholder="Họ & tên"
                {...register("hoTen")}
              />
            </div>
            {errors.hoTen && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.hoTen.message}
              </p>
            )}

            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Mật khẩu</span>
              <input
                type={passShow ? "text" : "password"}
                className="form-control"
                placeholder="Mật khẩu"
                {...register("matKhau")}
              />
              <div
                className={`input-group-text ${style.cursor}`}
                onClick={() => setPassShow(!passShow)}
              >
                {passShow ? (
                  <i class="bi bi-eye-slash"></i>
                ) : (
                  <i class="bi bi-eye"></i>
                )}
              </div>
            </div>

            {errors.matKhau && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.matKhau.message}
              </p>
            )}

            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Email</span>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.email.message}
              </p>
            )}

            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Số điện thoại</span>
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
                {...register("soDt")}
              />
            </div>
            {errors.soDt && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.soDt.message}
              </p>
            )}

            <div className={`input-group ${style.input}`}>
              <span className="input-group-text">Loại người dùng</span>
              <select
                className="form-control"
                name="mySelect"
                {...register("maLoaiNguoiDung")}
              >
                <option value="KhachHang">Khách hàng</option>
                <option value="QuanTri">Quản trị</option>
              </select>
            </div>
            {errors.maLoaiNguoiDung && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.maLoaiNguoiDung.message}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btnPrimary">
              Cập nhật
            </button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
}

export default AdminUserForm;
