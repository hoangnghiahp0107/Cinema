import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {apiUpdateInfoUser} from '../../apis/userAPI';
import { getInfoUser } from "../../slices/infoUserSlice";
import style from './AdminInfoUser.module.scss';

// định nghĩa các xác thực input
const schema = yup.object({
    taiKhoan: yup.string().required('Tài khoản không được để trống'),
    matKhau: yup
        .string()
        .required('Mật khẩu không được để trống')
        .matches(/^(?=.*[A-Z]).{6,}$/, 'Mật khẩu có ít nhất 6 ký tự'),
    hoTen: yup.string().required('Tài khoản không được để trống'),
    email: yup
        .string().email('Email không hợp lệ').required('Email không được để trống'),
    soDT: yup.string().typeError('Số điện thoại phải là số').required('Số điện thoại không được để trống'),
    maLoaiNguoiDung: yup
        .string()
        .required('Loại người dùng không được để trống'),
});

function AdminInfoUser() {
    const dispatch = useDispatch();
    // get info user from redux để => thông tin tài khoản call API
    const {user} = useSelector((state) => state.user);
    // set show modal update information user
    const [show, setShow] = useState(false);
    // set show password
    const [passShow, setPassShow] = useState(false);

    const [updateUser, setUpdateUser] = useState(null);
    // console.log(updateUser);
    const [err, setErr] = useState(null);

    const {register, handleSubmit, reset,formState: {errors}} = useForm({
        defaultValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDT: '',
            maLoaiNguoiDung: '',
            maNhom: 'GP03',
        },
        mode: "onTouched",
        resolver: yupResolver(schema)
    });

    const {infoUser, isLoading, error} = useSelector((state) => state.infoUser);
    // console.log(infoUser);
    useEffect(() => {
        dispatch(getInfoUser(user?.taiKhoan));
      }, [user?.taiKhoan]);

    // react form
    
    // gọi api trả về, ko lưu redux vì chỉ sài 1 lần sau đó put update thông tin
    const onSubmit = async (value) => {
        try{
            const data = await apiUpdateInfoUser(value);
            // console.log(data);
            setUpdateUser(data);
        }catch (err) {
            setErr(err)
        }
        };
    // vì giá trị defaultValues phải đợi từ asyn trả về nên phải sử dụng reset, ko set defaultValues bên trong hàm dc
    useEffect(()=>{
        reset({
            taiKhoan: infoUser.taiKhoan,
            matKhau: infoUser?.matKhau,
            hoTen: infoUser?.hoTen,
            email: infoUser?.email,
            soDT: infoUser?.soDT,
            maLoaiNguoiDung: infoUser?.maLoaiNguoiDung,
            maNhom: 'GP03',
        })
    },[infoUser]);


    const onErrer = (err) => {
        console.log(err);
    }

    if(isLoading) return (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <img src={'/img/loading.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
        </div>
      )

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
                                    <td scope="col" className='fs-4 fw-bolder'>{infoUser?.hoTen}</td>
                                </tr>
                                <tr>
                                    <td scope="col">Tài khoản :</td>
                                    <td scope="col">{infoUser?.taiKhoan}</td>
                                </tr>
                                <tr>
                                    <td scope="col">Loại tài khoản :</td>
                                    <td scope="col" className='fs-5 fst-italic text-danger'>{infoUser?.loaiNguoiDung?.tenLoai}</td>
                                </tr>
                                <tr>
                                    <td scope="col">Email :</td>
                                    <td scope="col">{infoUser?.email}</td>
                                </tr>
                                <tr>
                                    <td scope="col">Phone :</td>
                                    <td scope="col">{infoUser?.soDT}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6">
                    <div 
                        className={style.left}
                        onClick={()=>setShow(infoUser?.taiKhoan ? true : false)}
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
    <Modal.Header className='bg-pink-primary' closeButton>
        <Modal.Title className='text-header-border-color'>Cập nhật thông tin</Modal.Title>
    </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit, onErrer)}>
    <Modal.Body className={style.formBody}>
        <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Tài khoản</span>
            <input 
                type="text" 
                className="form-control"
                disabled
                placeholder='Tài khoản'
                {...register('taiKhoan')}
                />
        </div>
            {errors.taiKhoan && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.taiKhoan.message}</p>}
        <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Mật khẩu</span>
            <input 
                type={passShow? 'text' : 'password'}
                className="form-control" 
                placeholder='Mật khẩu'
                {...register('matKhau')}
                />
            <div 
                className="input-group-text"
                onClick={()=>setPassShow(!passShow)}
                >
                {passShow ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}
                
            </div>
        </div>
            {errors.matKhau && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.matKhau.message}</p>}
        <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Họ và tên</span>
            <input 
                type="text"
                className="form-control" 
                placeholder='Họ và tên'
                {...register('hoTen')}
                />
        </div>
            {errors.hoTen && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.hoTen.message}</p>}
        <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Email</span>
            <input 
                type="text"
                className="form-control"
                placeholder='Email'
                {...register('email')}
                />
        </div>
            {errors.email && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.email.message}</p>}
        <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Số điện thoại</span>
            <input 
                type="text"
                className="form-control" 
                placeholder='Số điện thoại'
                {...register('soDT')}
                />
        </div>
            {errors.soDT && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.soDT.message}</p>}
        <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Mã loại người dùng</span>
            <select 
                type="text"
                className="form-control" 
                placeholder='Mã loại người dùng'
                {...register('maLoaiNguoiDung')}
                >
                <option value="QuanTri">Quản trị</option>
                <option value="KhachHang">Khách hàng</option>
            </select>
        </div>
            {errors.maLoaiNguoiDung && <p className='fs-7 text-danger fst-italic'>{errors.maLoaiNguoiDung.message}</p>}
    </Modal.Body>
    <Modal.Footer>
        <button type='submit' className={`btn ${style.btnPrimary}`}>Cập nhật</button>
    </Modal.Footer>
    </form>
    </Modal>
    </>
  )
}

export default AdminInfoUser