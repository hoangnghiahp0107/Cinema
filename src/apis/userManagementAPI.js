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

export const apiGetUsersPage = async (value) => {
  const payload = { ...value, maNhom };
  const { data } = await axiosClient.get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang");
};
