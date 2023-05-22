import React from 'react';
import Header from '../../components/Header/Header';
import {Outlet} from 'react-router-dom';
import Footer from '../../components/Footers/Footer';

function MainLayout() {
  return (
    <div>
        <Header />

        <Outlet/>

        <Footer />
    </div>
  )
}

export default MainLayout