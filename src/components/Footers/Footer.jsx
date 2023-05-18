import React from 'react'
import './Footer.scss';

function Footer() {
  return (
    <div className='foot'>
        <div className="container pt-4 pb-4">
          <div class="row line">
            <div className="col">
              <a  href="#">
                <span className='text-white headfoot'>Lịch chiếu phim</span>
              </a>
              <ul>
                <li className='chon'><a href="#">Phim đang chiếu</a></li>
                <li className='chon'><a href="#">Phim sắp chiếu</a></li>
              </ul>
            </div>
            <div className="col">        
              <a href="#">
                <span className='text-white headfoot'>Blog điện ảnh</span>
                </a>
              <ul>
                <li className='chon'><a href="#">Phim chiếu rạp</a></li>
                <li className='chon'><a href="#">Top phim</a></li>
                <li className='chon'><a href="#">Phim Netflix</a></li>
              </ul>
            </div>
            <div className="col">
              <a href="#">
                <span className='text-white headfoot'>Review Phim</span>
              </a>
              <ul>
                <li className='chon'><a href="#">Bình luận từ người xem</a></li>
                <li className='chon'><a href="#">Review phim từ MoMo</a></li>
              </ul>        
            </div>
            <div className="col">
              <a href="#">
                <span className='text-white headfoot'>Rạp chiếu phim</span>
              </a>
              <ul>
                <li className='chon'><a href="#">BHD Star</a></li>
                <li className='chon'><a href="#">CGV</a></li>
                <li className=''><a href="#">CineStar</a></li>
                <li className='chon'><a href="#">Galaxy Cinema</a></li>
                <li className='chon'><a href="#">Lotte Cinema</a></li>                
                <li className='chon'><a href="#">Mega GS</a></li>
              </ul>
            </div>
            <div className="col">
              <span className='text-white care'>CHĂM SÓC KHÁCH HÀNG</span>    
              <ul>
                <li>
                  <span>Địa chỉ: </span>
                  Tầng M, Tòa nhà Victory Tower, Số 12 Tân
                  <br /> Trào, Phường Tân Phú, Quận 7, Thành phố Hồ Chí 
                  <br/>Minh
                </li>
                <li>
                  <span>Hotline: </span>
                  <a href="#" className='contact'>1900 5454 41 </a>
                  (1000 đ/phút)
                </li>
                <li>
                  <span>Email: </span>
                  <a href="#">
                    <span className='contact'>hotro@momo.vn</span>
                  </a>
                </li>
                <li>
                  <span>Tổng đài gọi ra </span>
                  <a href="#" className='contact'>028.7306.5555 </a>
                  <span>-</span>
                  <a href="#" className='contact'> 028.9999.5555</a>
                </li> 
                 <li className='mt-2 mb-2'>
                    <img className='mx-2 download' src="./img/momo-AppStore.jpg" alt="Apple" />
                    <img className='mx-2 download' src="./img/momo-GooglePlay.jpg" alt="Android" />
                 </li>  
              </ul>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-6 diaChi">
              <div className="col-left">
                <i className="icon bi bi-ticket-perforated fs-2 me-3"></i>
              </div>
              <div className="col-right">
                <div className='address-top text-white'>
                  Công Ty Cổ Phần Dịch Vụ Di Động Trực Tuyến (viết tắt M_Service)
                </div>
                <div className='mt-1 address-bot'>
                  Lầu 6, Toà nhà Phú Mỹ Hưng, số 8 Hoàng Văn Thái, khu phố 1, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh
                </div>
              </div>
            </div>
            <div className="col">
              <div className='hinhAnh choice'>
                <img className='mx-2 ' src="https://static.mservice.io/styles/desktop/images/social/facebook.svg" alt="facebook" />
                <img className='mx-2' src="https://static.mservice.io/styles/desktop/images/social/linkedin.svg" alt="linkedin" />
                <img className='mx-2' src="https://static.mservice.io/styles/desktop/images/social/youtube.svg" alt="youtube" />
              </div>
              <div className='mt-2 head'>©Copyright M_Service 2023</div>
            </div>
            <div className="col">
              <div className='mb-2 head'>Chứng nhận bởi</div>
              <img className='choice' src="https://static.mservice.io/blogscontents/momo-upload-api-210629153623-637605777831780706.png" alt="chungnhan" />
            </div>
          </div>
        </div>
  
    </div>
  )
}

export default Footer