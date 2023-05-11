import axiosClient from "./axiosClient";
import {apiSignIn} from './userAPI';

export const refreshTokenFn = async () => {
    try {
    // lấy thông tin tk, pass từ localStorage
    const {taiKhoan} = JSON.parse(localStorage.getItem("user"));
    const getPassword = async (taiKhoan) => {
        try {
          const { data } = await axiosClient.get(`/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${taiKhoan}`);
          return data?.content[0]?.matKhau;
        } catch (error) {
          console.error("Error retrieving password:", error);
          throw error.response?.data?.content;
        }
      };
    const matKhau = await getPassword(taiKhoan);
    const user = {
                    taiKhoan, 
                    matKhau : matKhau
                }
    const response = await apiSignIn(user)
    const {accessToken} = response?.content;
      return accessToken;
    } catch (error) {
        console.log(error);
    }
  };
  