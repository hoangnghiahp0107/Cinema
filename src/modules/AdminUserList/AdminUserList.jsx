import React, { useEffect } from "react";
import styles from "./AdminUserList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../slices/userListSlice";

function AdminUserList() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  //   if (isLoading)
  //     return (
  //       <div className="h-100 d-flex justify-content-center align-items-center">
  //         <img
  //           src={"/img/loading.gif"}
  //           className="img-fluid"
  //           style={{ height: "100px", width: "100px" }}
  //         />
  //       </div>
  //     );
  console.log(users);
  return (
    <div>
      {/* {users?.map((it) => {
        return <p>{it.taiKhoan}</p>;
      })} */}
    </div>
  );
}

export default AdminUserList;
