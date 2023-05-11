import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

function AdminLayout() {
 
  return (
    <div className=''>
      <div className="row">
          <div className="col-2">
              <AdminSideBar />
          </div>
          <div className="col-10 bg-bg-light-color" style={{marginLeft: '-12px'}}>
            <div className=''>
              <AdminHeader/>
              <Outlet />
            </div>
          </div>
      </div>
    </div>
  )
}

export default AdminLayout