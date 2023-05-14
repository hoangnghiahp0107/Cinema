import React from "react";
import {Button} from 'react-bootstrap';
import {useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import { signout } from "../../slices/userSlice";
import { removeRegisUser } from "../../slices/regisUserSlice";
// my style
import style from "./ButtonLogin.module.scss";

function ButtonLogin() {
  // debugger;
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // logout
  const handleSignOut = () => {
    swal({
      title: "Bạn có muốn đăng xuất!",
      text: "Nhấn Ok để tiếp tục!",
      icon: "warning",
      buttons: true,
    })
    .then((willSuccess) => {
      if (willSuccess) {
        dispatch(signout());
        dispatch(removeRegisUser());
        localStorage.removeItem('user');
      } 
    });
  }

  return (
    <div>
      {/* btn đăng nhập */}
      {!user && <Button onClick={() => navigate('/signin')} bsPrefix={style.btnPrimary}>ĐĂNG NHẬP</Button>}

      {/* avatar */}
      {user && (
        <div className="d-flex">
          <div className={`${style.userShow} me-2 rounded-circle bg-gray-400 position-relative`}>
            <i className="bi bi-bell"></i>
            <div className="position-absolute thongbaoNum">1</div>
          </div>
          <div className={style.userShow}>
            <img className={style.avatarImg} alt='' src="/img/avatar.jpeg"/>
          </div>
          <button className="ms-3 btn btn-danger" onClick={handleSignOut}>Đăng xuất</button>
        </div>)}
    </div>
  );
}
  
  export default ButtonLogin;
  
