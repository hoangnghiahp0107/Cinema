import React, { useEffect, useState } from "react";
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
  const { users, isLoading, error } = useSelector(
    (state) => state.userListPage
  );
  const { updated } = useSelector((state) => state.updateUser);
  useEffect(() => {
    dispatch(getUserListPage({ soTrang: current, soPhanTuTrenTrang: 10 }));
  }, [current, updated]);
  const [updateUser, setUpdateUser] = useState();
  const handleUpdateUser = (index) => {
    setUpdateUser(users?.items[index]);
    setShow(true);
    dispatch(userUpdated(false));
  };

  const [deleteUser, setDeleteUser] = useState(null);
  const handleDeleteUser = async (taiKhoan) => {
    try {
      const data = await apiDeleteUser(taiKhoan);
      setDeleteUser(data);
      console.log(deleteUser);
      dispatch(getUserListPage({ soTrang: current, soPhanTuTrenTrang: 10 }));
      if (deleteUser) {
        swal("Xóa người dùng thành công", "You clicked the button!", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PaginationChange = (page) => {
    setCurrent(page);
  };
  const handleShow = (value) => {
    setShow(value);
  };

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
      <button className="button" onClick={() => navigate("/admin/add-user")}>
        Thêm người dùng mới
      </button>
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
                      
                      <td>{item.maLoaiNguoiDung}</td>
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
            <Pagination
              onChange={PaginationChange}
              total={users.totalPages}
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
