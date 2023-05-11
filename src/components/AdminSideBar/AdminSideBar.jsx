import React, {useState} from 'react';
import style from './AdminSideBar.module.scss';
import Collapse from 'react-bootstrap/Collapse';

function AdminSideBar() {
    const [activeFooterItem, setActiveFooterItem] = useState(1);
    const handleFooterItem = (itemId) => {
        if(activeFooterItem === itemId) return;
        setActiveFooterItem((prevActiveItem) => (prevActiveItem === itemId ? null : itemId));
      };
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
                    onClick={() => handleFooterItem(1)}
                >
                    Thông tin 
                </li>
            </div>
            <div>
                <li
                    className={`${style.footerItem} ${activeFooterItem === 2 ? style.action : ''}`}
                    onClick={() => handleFooterItem(2)}
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