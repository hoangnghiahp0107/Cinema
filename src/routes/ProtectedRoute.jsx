// import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import swal from 'sweetalert';

// check khi truy cập cần đăng nhập với có thể truy cập
function ProtectedRoute({children}) {
    const {user} = useSelector((state) => state.user);
    const {pathname} = useLocation();
    const navigate = useNavigate();

    // nếu chưa có đăng nhập -> điều hướng về page signin
    if(!user) {
      // return <Navigate to={`/signin?redireactUrl=${pathname}`} patch replace/>
      swal({
        title: "Bạn phải đăng nhập để mua vé ",
        text: "Nhấn Ok để tiếp tục!",
        icon: "warning",
      })
      .then((willSuccess) => {
        if (willSuccess) {
          navigate(`/signin?redireactUrl=${pathname}`, {replace: true});
          // console.log('chuyển về singin');
          // return <Navigate to={`/signin?redireactUrl=${pathname}`} patch replace/>
        }
      });
    }
    // TH đã đăng nhập -> cho phép truy cập
    
  return children;
}

export default ProtectedRoute;