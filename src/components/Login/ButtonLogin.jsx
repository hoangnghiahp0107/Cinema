import {useState,useEffect, useRef} from "react";
import { Animated } from "react-animated-css";
import {Modal,Form,InputGroup,Button} from 'react-bootstrap';
import style from "./ButtonLogin.module.scss";

// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function ButtonLogin() {
  const [isLogin, setIslogin] = useState(false);
  const [isRegister, setIsRegister] = useState (false);
  const login = (event) => {
    setIslogin(true);
    setIsRegister(false);
    event.preventDefault()
  }
  const register = (event) => {
    setIslogin(false);
    setIsRegister(true);
    event.preventDefault()
  }
  const handleClose = () => {
    setIslogin(false);
    setIsRegister(false);
  }
  
  return (
    <div>
      {/* btn đăng nhập */}
      <Button onClick={() => setIslogin(true)} disabled={isLogin} bsPrefix={style.btnPrimary}>ĐĂNG NHẬP</Button>
      <Animated
        className="position-absolute z-10"
        animationIn="fadeInUp"
        animationOut="fadeOutUp"
        animationInDuration={300}
        animationOutDuration={200}
        isVisible={isLogin}
      >
        <Modal show={isLogin || isRegister} onHide={handleClose} className="text-light-emphasis" >
          <Modal.Header>
              <ul className={style.headerLogin}>
                <li className={`ms-1 ${isLogin? style.active : ''}`}>
                  <a href="" onClick={login}>Đăng nhập</a>
                </li>
                <li className="ms-3">/</li>
                <li className={`ms-3 ${isRegister? style.active : ''}`}>
                  <a href="" onClick={register}>Đăng ký</a>
                </li>
              </ul>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1">Tài khoản</InputGroup.Text>
              <Form.Control/>
              <Form.Control.Feedback tooltip='true' className="ms-1">Looks good!</Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text className="row col-4 mx-1" >Mật khẩu</InputGroup.Text>
              <Form.Control  type="password"/>
              <Form.Control.Feedback type="invalid" className="ms-1">Looks good!</Form.Control.Feedback>
            </InputGroup>
            <div className={isRegister? 'd-block' : 'd-none'}>
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Nhập lại mật khẩu</InputGroup.Text>
                <Form.Control  type="password"/>
                <Form.Control.Feedback className="ms-1">Looks good!</Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Họ và tên</InputGroup.Text>
                <Form.Control/>
                <Form.Control.Feedback className="ms-1">Looks good!</Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Text className="row col-4 mx-1">Email</InputGroup.Text>
                <Form.Control type="email"/>
                <Form.Control.Feedback className="ms-1">Looks good!</Form.Control.Feedback>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text className="row col-4 mx-1">Số điện thoại</InputGroup.Text>
                <Form.Control/>
                <Form.Control.Feedback className="ms-1">Looks good!</Form.Control.Feedback>
              </InputGroup>
            </div>
            <div className="ms-2 mt-3">
              <a href="" className={style.quenPass}>Quên mật khẩu</a>
            </div>
          </Modal.Body>
          <Modal.Footer className="w-100 justify-content-center">
            
            <div className="w-100">
              <button type="submit" className={`${style.btnPrimary} w-100`}>{isLogin? 'Đăng nhập' : ' Đăng ký'}</button>
            </div>
          </Modal.Footer>
        </Modal>
      </Animated>
    </div>
  );
}
  
  export default ButtonLogin;
  
  /* avatar */
  // {isUserShow && (
  //   <div className="d-flex" style={{display: !isUserShow? 'none' : 'block'}}>
  //     <div className={`${style.userShow} me-2 rounded-circle bg-gray-400 position-relative`}>
  //       <i class="bi bi-bell"></i>
  //       <div className="position-absolute thongbaoNum">1</div>
  //     </div>
  //     <div className={style.userShow}>
  //       <img className={style.avatarImg} src="/img/avatar.jpeg"/>
  //     </div>
  //   </div>)
