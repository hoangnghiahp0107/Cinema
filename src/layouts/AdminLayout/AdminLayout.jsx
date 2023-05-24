import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import style from './AdminLayout.module.scss';

function AdminLayout() {
  return (
    <div className={style.adminLayout}>
      <div className={`${style.adminShow}`}>
        <div className="col-2">
          <AdminSideBar />
        </div>
        <div
          className="col-10 bg-bg-light-color"
          style={{ marginLeft: "-12px" }}
        >
          <div className="">
            <AdminHeader />
            <Outlet />
          </div>
        </div>
      </div>
      <div className={style.adminInfo}>
        <div className={`container ${style.detail}`}>
          <img src='/img/admin.gif' alt="" />
          <p>Hệ thống chỉ hỗ trợ cho kích thước màn hình destop</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
