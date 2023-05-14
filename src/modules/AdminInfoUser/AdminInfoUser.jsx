import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import style from './AdminInfoUser.module.scss';
import {apiGetInfoUser} from '../../apis/userAPI';

// định nghĩa các xác thực input
const schema = yup.object({
    taiKhoan: yup.string().required('Tài khoản không được để trống'),
    matKhau: yup
        .string()
        .required('Mật khẩu không được để trống')
        .matches(/^(?=.*[A-Z]).{6,}$/, 'Mật khẩu có ít nhất 6 ký tự'),
    hoTen: yup.string(),
    email: yup
        .string().email('Email không đứng định dạng'),
    soDT: yup.number('Số điện thoại phải là số'),
    maLoaiNguoiDung: yup
        .string()
        .required('Loại người dùng không được để trống'),

})

function AdminInfoUser() {
    const {user} = useSelector((state) => state.user);
    console.log(user.taiKhoan);
    // set show modal update information user
    const [show, setShow] = useState(false);
    const [infoUser, setInfoUser] = useState([]);
    const [err, setErr] = useState(null);
  
    const getInfoUser = async (obj) => {
        console.log(obj);
      try{
        const {content} = await apiGetInfoUser(obj);
        setInfoUser(content);
      }catch (err) {
        setErr(err.response?.data?.content)
      }
    };
    useEffect(() => {
        getInfoUser(user.taiKhoan);
    }, []);

    // console.log(infoUser);
    const onSubmit = (value) => {
        // dispatch(singin(value));
    }

    const onErrer = (err) => {
        console.log(err);
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            taiKhoan: infoUser.taiKhoan,
            matKhau: infoUser.matKhau,
            hoTen: infoUser.hoTen,
            email: infoUser.email,
            soDT: infoUser.soDT,
            maLoaiNguoiDung: infoUser.maLoaiNguoiDung,
        },
        mode: "onTouched",
        resolver: yupResolver(schema)
    });

  return (
    <>
        <div className={style.infoUser}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className={style.right}>
                            <table className={style.table}>
                                <tbody>
                                    <tr>
                                        <td scope="col">Name :</td>
                                        <td scope="col" className='fs-4 fw-bolder'>{user.hoTen}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col">Tài khoản :</td>
                                        <td scope="col">{user.taiKhoan}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col">Loại tài khoản :</td>
                                        <td scope="col" className='fs-5 fst-italic text-danger'>{user.maLoaiNguoiDung}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col">Email :</td>
                                        <td scope="col">{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col">Phone :</td>
                                        <td scope="col">{user.soDT}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-6">
                        <div 
                            className={style.left}
                            onClick={()=>setShow(true)}
                        >
                            <i class="bi bi-pencil-square"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
        show={show}
        onHide={()=>setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit, onErrer)}>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    placeholder='Tài khoản'
                    value={infoUser.taiKhoan}
                    {...register('taiKhoan')}
                    />
                {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            <div className="input-group mb-3">
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Mật khẩu'
                    value={infoUser.matKhau}
                    {...register('matKhau')}
                    />
                {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>
            <div className="input-group mb-3">
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Họ và tên'
                    value={infoUser.hoTen}
                    {...register('hoTen')}
                    />
                {errors.hoTen && <p>{errors.hoTen.message}</p>}
            </div>
            <div className="input-group mb-3">
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Email'
                    value={infoUser.email}
                    {...register('email')}
                    />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="input-group mb-3">
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Số điện thoại'
                    value={infoUser.soDT}
                    {...register('soDT')}
                    />
                {errors.soDT && <p>{errors.soDT.message}</p>}
            </div>
            <div className="input-group mb-3">
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Mã loại người dùng'
                    value={infoUser.maLoaiNguoiDung}
                    {...register('maLoaiNguoiDung')}
                    />
                {errors.maLoaiNguoiDung && <p>{errors.maLoaiNguoiDung.message}</p>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={()=>setShow(false)}>
            Close
          </button>
          <button variant="primary">Understood</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminInfoUser