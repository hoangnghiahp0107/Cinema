import axiosClient from "./axiosClient";

export const datveAPI = async (value) => {
    const {data} = await axiosClient.post('/QuanLyDatVe/DatVe', value);
    return data;
};