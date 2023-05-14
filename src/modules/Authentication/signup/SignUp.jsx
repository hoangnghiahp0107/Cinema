import React from "react";
import { Modal, Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { signup } from "../../../slices/regisUserSlice";
import { signin } from "../../../slices/userSlice";
import { useForm } from "react-hook-form";
// my style
import style from "./SignUp.module.scss";

function SignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
    },
    mode: "onTouched",
  });

  const { user, isLoading, error } = useSelector((state) => state.regisUser);

  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  const onError = (err) => {
    // console.log(err);
  };
  const navigate = useNavigate();

  user &&
    swal(
      "Chúc mừng bạn đã đăng ký thành công!",
      "You clicked the button!",
      "success"
    );
  if (user) {
    const userSignin = {
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
    };
    dispatch(signin(userSignin));
  }
  if (user) navigate(`/`);

  if (isLoading)
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <img src="img/loading.gif" alt="" />
      </div>
    );

  return (
    <div className="bg-bg-dark-color p-5">
      <div className=" w-50 m-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Modal.Body>
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Tài khoản
              </InputGroup.Text>
              <Form.Control
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Tài khoản không được để trống",
                  },
                })}
              />
            </InputGroup>
            {errors.taiKhoan && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.taiKhoan.message}
              </p>
            )}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Mật khẩu
              </InputGroup.Text>
              <Form.Control
                type="password"
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự hoa, thường.",
                  },
                })}
              />
            </InputGroup>
            {errors.matKhau && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.matKhau.message}
              </p>
            )}

            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Nhập lại mật khẩu
              </InputGroup.Text>
              <Form.Control
                type="password"
                {...register(
                  "reMatKhau",
                  {
                    required: {
                      value: true,
                      message: "Mật khẩu không được để trống",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message:
                        "Mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự hoa, thường và ký tự đặc biệt.",
                    },
                    validate: {
                      value: (value) => {
                        const { matKhau } = getValues();
                        return matKhau === value
                          ? null
                          : "Mật khẩu nhập lại không trùng khớp.";
                      },
                    },
                  },
                  {}
                )}
              />
            </InputGroup>
            {errors.reMatKhau && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.reMatKhau.message}
              </p>
            )}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Họ và tên
              </InputGroup.Text>
              <Form.Control
                {...register("hoTen", {
                  required: {
                    value: true,
                    message: "Họ và Tên không được để trống",
                  },
                })}
              />
            </InputGroup>
            {errors.hoTen && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.hoTen.message}
              </p>
            )}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">
                Email
              </InputGroup.Text>
              <Form.Control
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email không được để trống",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email không đúng định dạng",
                  },
                })}
              />
            </InputGroup>
            {errors.email && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.email.message}
              </p>
            )}
            <InputGroup>
              <InputGroup.Text className="row col-4 mx-1">
                Số điện thoại
              </InputGroup.Text>
              <Form.Control
                {...register("soDt", {
                  required: {
                    value: true,
                    message: "Số điện thoại không được để trống",
                  },
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            {errors.soDt && (
              <p className="ms-3 fs-7 text-danger fst-italic">
                {errors.soDt.message}
              </p>
            )}
          </Modal.Body>

          <Modal.Footer className="w-100 justify-content-center">
            <div className="w-100 mt-4">
              <button
                type="submit"
                className={`${style.btnPrimary} w-100`}
                disabled={isLoading ? true : false}
              >
                Đăng ký
              </button>
            </div>
            <div className="w-100 py-2">
              <button
                onClick={() => navigate("/signin")}
                className={`${style.btnPrimary} w-100`}
                disabled={isLoading ? true : false}
              >
                Đăng nhập
              </button>
            </div>
          </Modal.Footer>
          {error && (
            <p className="text-center fs-7 text-danger fst-italic">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
