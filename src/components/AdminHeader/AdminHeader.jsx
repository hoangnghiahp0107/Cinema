import React from 'react';
import {useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import { signout } from "../../slices/userSlice";
import { removeRegisUser } from "../../slices/regisUserSlice";
import style from './AdminHeader.module.scss'

function AdminHeader() {
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
    
      const navigate = useNavigate();
  return (
    <div className='py-3 d-flex justify-content-end'>
        <button 
          className={`btn me-4 ${style.btnPrimary}`}
          onClick={()=>navigate('/')}
          >Trang chủ</button>
        <button className='btn btn-danger me-5' onClick={handleSignOut}>Đăng xuất</button>
    </div>
  )
}

export default AdminHeader