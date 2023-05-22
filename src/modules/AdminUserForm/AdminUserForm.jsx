import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiUpdateUser } from "../../apis/userManagementAPI";

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
    // defaultValues: {
    //   taiKhoan: onUpdateUser.taiKhoan,
    //   matKhau: "",
    //   email: "",
    //   soDt: "",
    //   maLoaiNguoiDung: "",
    //   hoTen: "",
    // },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [userUpdate, setUserUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let formData = new FormData();
  const onSubmit = async (value) => {
    setIsLoading(true);
    formData.append("hoTen", value.hoTen);
    formData.append("taiKhoan", value.taiKhoan);
    formData.append("matKhau", value.matKhau);
    formData.append("email", value.email);
    formData.append("soDt", value.soDt);
    formData.append("maLoaiNguoiDung", value.maLoaiNguoiDung);
    formData.append("maNhom", "GP03");
    try {
      const data = await apiUpdateUser(formData);
      setUserUpdate(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(onUpdateUser);
    if (onUpdateUser) {
      reset({
        hoTen: onUpdateUser.hoTen,
        taiKhoan: onUpdateUser.taiKhoan,
        matKhau: onUpdateUser.matKhau,
        email: onUpdateUser.email,
        soDt: onUpdateUser.soDt,
        maLoaiNguoiDung: onUpdateUser.maLoaiNguoiDung,
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="formBody">
            <div className="input-group input">
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

            <div className="input-group input">
              <span className="input-group-text">Tài khoản</span>
              <input
                type="text"
                className="form-control"
                placeholder="Tài khoản"
                {...register("taiKhoan")}
              />
            </div>
            {errors.taiKhoan && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.taiKhoan.message}
              </p>
            )}

            <div className="input-group input">
              <span className="input-group-text">Mật khẩu</span>
              <input
                type="text"
                className="form-control"
                placeholder="Mật khẩu"
                {...register("matKhau")}
              />
            </div>
            {errors.matKhau && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.matKhau.message}
              </p>
            )}

            <div className="input-group input">
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

            <div className="input-group input">
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

            <div className="input-group input">
              <span className="input-group-text">Loại người dùng</span>
              <select name="mySelect" {...register("maLoaiNguoiDung")}>
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
