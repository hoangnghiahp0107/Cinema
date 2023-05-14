import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { signin } from "../../../slices/userSlice";
// my style
import style from "./SignIn.module.scss";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const { user, isLoading, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(signin(data));
  };

  if (user) {
    const url = searchParams.get("redireactUrl") || "/";
    swal({
      title: "Bạn đã đăng nhập thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
        navigate(url);
      }
    });
  }

  const onError = (err) => {
    console.log(err);
  };

  if (isLoading)
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center">
        <img src="img/loading.gif" alt="" />
      </div>
    );

  return (
    <div className="bg-bg-dark-color p-5">
      <div className="w-50 m-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                    "Mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự hoa, thường và ký tự đặc biệt.",
                },
              })}
            />
          </InputGroup>
          {errors.matKhau && (
            <p className="ms-3 fs-7 text-danger fst-italic">
              {errors.matKhau.message}
            </p>
          )}

          <div className="w-100 pt-3">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className="w-100 ">
                <button
                  type="submit"
                  className={`${style.btnPrimary} w-100`}
                  disabled={isLoading ? true : false}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
            <div className="ms-4 text-end">
              <a href="#" className={style.quenPass}>
                Quên mật khẩu
              </a>
            </div>
            {error && (
              <p className="text-center fs-7 text-danger fst-italic">{error}</p>
            )}
          </div>
        </form>
        <div className="w-100 py-2">
          <button
            type="submit"
            onClick={() => navigate("/signup")}
            className={`${style.btnPrimary} w-100`}
            disabled={isLoading ? true : false}
          >
            Đăng ký thành viên mới
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
