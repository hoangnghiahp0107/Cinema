import React from "react";
import {Modal,Form,InputGroup} from 'react-bootstrap';
import {useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import {signin} from "../../../slices/userSlice";
import {useForm} from 'react-hook-form';
// my style
import style from './SignIn.module.scss';

function SignIn({userCurrent}) {
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
    },
  });

  const {user, isLoading, error} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signin(data));
  };

  const onErrer = (err) => {
      console.log(err);
  }
  const navigate = useNavigate();
  // console.log(isLogin);
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
          <Modal.Body>
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">Tài khoản</InputGroup.Text>
              <Form.Control 
                {...register('taiKhoan', {
                required: {
                  value: true,
                  message: 'Tài khoản không được để trống',
                },
              })}/>
            </InputGroup>
            {errors.taiKhoan && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.taiKhoan.message}</p>}
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1" >Mật khẩu</InputGroup.Text>
              <Form.Control type="password"
                {...register('matKhau', {
                required: {
                  value: true,
                  message: 'Mật khẩu không được để trống',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
                  message: 'Mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự hoa, thường và đặc biệt',
                },
              })}/>
            </InputGroup>
            {errors.matKhau && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.matKhau.message}</p>}
          </Modal.Body>
            
            <Modal.Footer className="w-100">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className="w-50">
                <button type="submit" className={`${style.btnPrimary} w-100`} disabled={isLoading ?  true : false}>Đăng nhập</button>
              </div>
              <div className="ms-4">
                <a href="" className={style.quenPass}>Quên mật khẩu</a>
              </div>
            </div>
            {error && <p className="text-center">{error}</p>}
            </Modal.Footer>
          </form>
            <div className="w-100 px-3 pb-3">
              <button type="submit" onClick={() => navigate('/signup')} className={`${style.btnPrimary} w-100`} disabled={isLoading ?  true : false}>Đăng ký thành viên mới</button>
            </div>
    </div>
  )
}

export default SignIn;