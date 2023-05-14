import axiosClient from "./axiosClient";

// lấy ds phòng vé
export const apiListTicket = async (bookingID) => {
    const {data} = await axiosClient.get('/QuanLyDatVe/LayDanhSachPhongVe', {
        params: {
            MaLichChieu: bookingID,
        }
    });
    return data;
};