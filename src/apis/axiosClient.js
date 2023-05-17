import axios from 'axios';
// import {refreshTokenFn} from './refreshToken';
import swal from 'sweetalert';

export const maNhom = 'GP03';

const axiosClient = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api',
    headers: {
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NjAzMjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk2MTc5NjAwfQ.i6JqYnGkwyHl6dkDHnjFWbPfBEl2l4SXAp4r7h9Ecpw',
    },
});

axiosClient.interceptors.request.use((confign) => {
    // config: chứa thông tin của request từ client gửi lên sever

    // thêm key Authorization vào headers của request nếu user đã đăng nhập
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
        confign.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return confign;
}
);

//nếu lỗi token tự động get new token nếu localstore có dữ liệu user và pass
// axiosClient.interceptors.response.use(
// (response) => {
//     return response
// },
// async (error) => {
//     if (error.response.status === 401) {
//       try {
//         const newToken = await refreshTokenFn();
//         // Update the request headers with the new token
//         error.config.headers.Authorization = `Bearer ${newToken}`;
//         // Retry the original request with the updated headers
//         return axiosClient.request(error.config);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         // Handle the token refresh error
//         // Optionally, you can redirect the user to the sign-in page or perform fallback actions
//       }
//     }
//     return Promise.reject(error);
//   }
// );

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // xử lý lỗi chung, vd 401
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      // khác navigate của react-router-dom là sẽ reload trình duyệt mất luôn state của redux
      // window.lo.replaceState(null, "/signin")
      swal({
        title: "Đã xảy ra lỗi đăng nhập",
        text: "Nhấn Ok để đăng nhập lại!",
        icon: "error",
      }).then((willSuccess) => {
        if (willSuccess) {
          window.location.href = "/signin";
        }
      });
    }
    throw error;
  }
);

export default axiosClient;
