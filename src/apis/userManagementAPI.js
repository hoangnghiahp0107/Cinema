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
  const formData = new FormData();
  for (let key in user) {
    formData.append(key, user[key]);
  }
  formData.append("maNhom", "GP03");
  const { data } = await axiosClient.post(
    "/QuanLyNguoiDung/ThemNguoiDung",
    formData
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
