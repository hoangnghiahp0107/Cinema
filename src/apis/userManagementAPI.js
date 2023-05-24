import axiosClient, { maNhom } from "./axiosClient";

export const apiGetUsers = async () => {
  const { data } = await axiosClient.get(
    "/QuanLyNguoiDung/LayDanhSachNguoiDung",
    {
      params: {
        maNhom,
      },
    }
  );
  return data;
};

//Lấy danh sách người dùng theo trang
export const apiGetUsersPage = async (value) => {
  const payload = { ...value, maNhom };
  const { data } = await axiosClient.get(
    "/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
    { params: payload }
  );
  return data;
};

//Xóa user
export const apiDeleteUser = async (taiKhoan) => {
  const { data } = await axiosClient.delete("/QuanLyNguoiDung/XoaNguoiDung", {
    params: {
      TaiKhoan: taiKhoan,
    },
  });
  return data;
};
//Thêm user
export const apiCreateUser = async (user) => {
  const { data } = await axiosClient.post(
    "/QuanLyNguoiDung/ThemNguoiDung",
    user
  );
  return data;
};
//UpdateUser
export const apiUpdateUser = async (value) => {
  const { data } = await axiosClient.post(
    "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    value
  );
  return data;
};
