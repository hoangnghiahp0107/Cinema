import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom'
import style from './AdminSideBar.module.scss';
import Collapse from 'react-bootstrap/Collapse';

function AdminSideBar() {
    const [activeFooterItem, setActiveFooterItem] = useState(1);
    const navigate = useNavigate();
    // debugger
    const handleFooterItem = (itemId) => {
        setActiveFooterItem(itemId);
      };

    const handleThongTin = () => {
        handleFooterItem(1);
        navigate('/admin');
    }

    const handleHistory = () => {
        handleFooterItem(2);
        navigate('history');
    }
    //   console.log(activeFooterItem);
    return (
    <div className={style.sideBar}>
        <div className={style.userPage}>
            <div className={style.logo}>BHN</div>
            <span>Trang cá nhân</span>
        </div>
        <ul className={style.footer}>
            <div>
                <li 
                    className={`${style.footerItem} ${activeFooterItem === 1 ? style.action : ''}`}
                    onClick={handleThongTin}
                >
                    Thông tin 
                </li>
            </div>
            <div>
                <li
                    className={`${style.footerItem} ${activeFooterItem === 2 ? style.action : ''}`}
                    onClick={handleHistory}
                >Lịch sử đặt vé</li>
            </div>
            <div>
            <li
                className={`${style.footerItem} ${activeFooterItem === 3 ? style.action : ''}`}
                onClick={() => handleFooterItem(3)}
            >
                Quản lý phim
                <span className={activeFooterItem === 3 ? style.icon : ''}><i className="bi bi-chevron-right"></i></span>
            </li>
            <Collapse in={activeFooterItem === 3}>
                <ul className={style.listItem}>
                    <li className={style.listItemDetail}>Danh sách phim</li>
                    <li className={style.listItemDetail}>Thêm phim</li>
                </ul>
            </Collapse>
            </div>
            <div>
                <li
                    className={`${style.footerItem} ${activeFooterItem === 4 ? style.action : ''}`}
                    onClick={() => handleFooterItem(4)}
                >
                    Quản lý User
                    <span className={activeFooterItem === 4 ? style.icon : ''}><i className="bi bi-chevron-right"></i></span>
                </li>
                <Collapse in={activeFooterItem === 4}>
                    <ul className={style.listItem}>
                        <li className={style.listItemDetail}>Danh sách User</li>
                        <li className={style.listItemDetail}>Thêm User</li>
                    </ul>
                </Collapse>
            </div>
        </ul>
    </div>
  )
}

export default AdminSideBar