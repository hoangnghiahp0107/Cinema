import React, {useEffect, useState} from "react";
import { Animated } from "react-animated-css";
import {Modal, Button} from 'react-bootstrap';
import {useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';

import SignIn from "../../modules/Authentication/singin/SignIn";
import { signout } from "../../slices/userSlice";
// my style
import style from "./ButtonLogin.module.scss";

function ButtonLogin() {
  // debugger;
  const {bookingID} = useParams();
  const {user} = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);
  // chờ nếu có user -> đăng nhập thành công tắt form bằng cách set cờ về false
  // ngược lại nếu là trang booking chưa login bật cờ để user login
  useEffect(() => {
    if(user) {
      setIsLogin(false);
    }
  },[user]);

  // nếu là trang booking và ko có user -> bật bật cờ đăng nhập
  // phải chờ sau lần render đầu tiên và nếu có bookingID thay đổi mới set cờ
  useEffect(() => {
    if(bookingID && !user) setIsLogin(true);
  }, [bookingID])

  const handleLogin = (event) => {
    setIsLogin(true);
    event.preventDefault();
  }

  const handleClose = () => {
    setIsLogin(false);
  }

  const dispatch = useDispatch();
  // logout
  const handleSignOut = () => {
    dispatch(signout());
    localStorage.removeItem('user');
  }

  return (
    <div>
      {/* btn đăng nhập */}
      {!user && <Button onClick={() => setIsLogin(true)} disabled={isLogin} bsPrefix={style.btnPrimary}>ĐĂNG NHẬP</Button>}
      
      <Animated
        className="position-absolute z-10"
        animationIn="fadeInUp"
        animationOut="fadeOutUp"
        animationInDuration={300}
        animationOutDuration={200}
        isVisible={isLogin}
      >
        <Modal show={isLogin} onHide={handleClose} className="text-light-emphasis" >
          <Modal.Header>
              <ul className={style.headerLogin}>
                <li className={`ms-1 ${isLogin? style.active : ''}`}>
                  <a href="" onClick={handleLogin}>Đăng nhập</a>
                </li>
                {/* <li className={`ms-3 ${isRegister? style.active : ''}`}>
                  <a href="" onClick={handleRegister}>Đăng ký</a>
                </li> */}
              </ul>
          </Modal.Header>
          <SignIn />
        </Modal>
      </Animated>

      {/* avatar */}
      {user && (
        <div className="d-flex">
          <div className={`${style.userShow} me-2 rounded-circle bg-gray-400 position-relative`}>
            <i className="bi bi-bell"></i>
            <div className="position-absolute thongbaoNum">1</div>
          </div>
          <div className={style.userShow}>
            <img className={style.avatarImg} src="/img/avatar.jpeg"/>
          </div>
          <button onClick={handleSignOut}>Đăng xuất</button>
        </div>)}
    </div>
  );
}
  
  export default ButtonLogin;
  
