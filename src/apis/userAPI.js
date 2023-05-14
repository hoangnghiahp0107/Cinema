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

// lấy thông tin user đầy đủ
export const apiGetInfoUser = async (user) => {
    const { data } = await axiosClient.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${user}`);
    return data;
};

// update info user
export const apiUpdateInfoUser = async (value) => {
    console.log(value);
    const data  = await axiosClient.post(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, value);
    // if(value ==)
    return data;
};
