import React, { useEffect, useState , useRef} from "react";
import "./AdminUserList.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserListPage } from "../../slices/userListPageSlice";
import { apiDeleteUser } from "../../apis/userManagementAPI";
import Pagination from "rc-pagination";
import { useNavigate } from "react-router-dom";
import AdminUserForm from "../AdminUserForm/AdminUserForm";
import { userUpdated } from "../../slices/updateUserSlice";
import swal from "sweetalert";

function AdminUserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState(null);

  //Search by name
  const handleInput = (evt) => {
    if (evt?.key == "Enter" || evt?.key == "Tab") {
      setSearchInput(evt?.target?.value);
    }
  };

  const { users, isLoading, error } = useSelector(
    (state) => state.userListPage
  );
  const { updated } = useSelector((state) => state.updateUser);
  useEffect(() => {
    dispatch(
      getUserListPage({
        soTrang: current,
        soPhanTuTrenTrang: 10,
        tuKhoa: searchInput ? searchInput : null,
      })
    );
  }, [current, updated, searchInput]);
  const [updateUser, setUpdateUser] = useState();
  const handleUpdateUser = (index) => {
    setUpdateUser(users?.items[index]);
    setShow(true);
    dispatch(userUpdated(false));
  };

  const [deleteError, setDeleteError] = useState('');
  console.log(deleteError);
const deleteUser= useRef(null);  
const handleDeleteUser = async (taiKhoan) => {
    try {
      const data = await apiDeleteUser(taiKhoan);
    //   setDeleteUser(data);
      deleteUser.current= data;
      dispatch(getUserListPage({ soTrang: current, soPhanTuTrenTrang: 10 }));
      setDeleteError('')
    } catch (error) {
      console.log(error?.response?.data?.content);
      setDeleteError(error?.response?.data?.content);
    }
  };
  console.log(deleteError);

  const PaginationChange = (page) => {
    setCurrent(page);
  };
  const handleShow = (value) => {
    setShow(value);
  };
  if (deleteUser.current?.statusCode === 200) {
    swal({
      title: `Xóa người dùng thành công`,
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
       deleteUser.current= null;
    //   if (willSuccess) {
    //     window.location.reload(false);
    //   }
     });
  }

  if (isLoading)
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <img
          src={"/img/loading.gif"}
          className="img-fluid"
          style={{ height: "100px", width: "100px" }}
        />
      </div>
    );
  return (
    <div className="userManagement">
      <h2>Danh sách người dùng</h2>
      <div className="d-flex justify-content-around">
        <div className="input-group w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập họ và tên người dùng và nhấn Enter..."
            name="inputValue"
            onKeyDown={handleInput}
          />
          <button
            className="button"
            onClick={() => navigate("/admin/add-user")}
          >
            Thêm người dùng mới
          </button>
        </div>
      </div>

      <div className="body">
        <div className="container">
          <div className="row">
            <table className="">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tài khoản</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Mật khẩu</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Loại người dùng</th>
                </tr>
              </thead>
              <tbody>
                {users?.items?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.taiKhoan}</td>
                      <td>{item.hoTen}</td>
                      <td>{item.matKhau}</td>
                      <td>{item.email}</td>
                      <td>{item.soDt}</td>

                      <td>{item.maLoaiNguoiDung==="QuanTri"?"Quản trị" : "Khách hàng"}</td>
                      <td>
                        <button
                          className="btn text-secondary me-1 border-warning"
                          onClick={() => handleUpdateUser(index)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn text-danger border-success"
                          onClick={() => handleDeleteUser(item.taiKhoan)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {deleteError && <p className="text-danger text-center mt-3">{deleteError}</p>}
            <Pagination
              onChange={PaginationChange}
              total={
                users.totalCount % 10 == 0
                  ? users.totalPages - 1
                  : users.totalPages
              }
              current={current}
              pageSize={1}
              className="pagination1"
            />
          </div>
        </div>
      </div>
      <AdminUserForm
        onShow={show}
        handleShow={handleShow}
        onUpdateUser={updateUser}
      />
    </div>
  );
}

export default AdminUserList;
