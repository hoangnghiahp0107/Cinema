import axiosClient, {maNhom} from "./axiosClient";

export const apiSignIn = async (value) => {
    const {data} = await axiosClient.post('/QuanLyNguoiDung/DangNhap', value);
    return data;
};

export const apiSignUp = async (value) => {
    const payload = {...value, maNhom}
    const {data} = await axiosClient.post('/QuanLyNguoiDung/DangKy', payload);
    return data;
};