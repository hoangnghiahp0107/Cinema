import axiosClient, { maNhom } from "./axiosClient";

// lấy ds lịch chiếu phim
export const apiGetMovies = async () => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: maNhom,
    },
  });
  return data;
};

// lấy ds lịch chiếu phim theo trang
export const apiGetMoviesPages = async (value) => {
  const payload = { ...value, maNhom };
  // console.log(value);
  const { data } = await axiosClient.get(
    "/QuanLyPhim/LayDanhSachPhimPhanTrang",
    { params: payload }
  );
  return data;
};

// lấy banner
export const apiGetBanners = async () => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachBanner");
  return data;
};

// lấy thông tin chung phim đang chiếu và sắp chiếu
export const apiGetMovieDetails = async (movieID) => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayThongTinPhim", {
    params: {
      MaPhim: movieID,
    },
  });
  return data;
};

// lấy thông tin list HeThongRap (CGV, BHD...)
export const apiGetListHeThongCumRap = async (maHeThongRap) => {
  const { data } = await axiosClient.get("/QuanLyRap/LayThongTinHeThongRap", {
    params: {
      maHeThongRap,
    },
  });
  return data;
};

// lấy thông tin tên HeThongRap (CGV Bình tân, Tân Phú, BHD Q2...)
export const apiGetCinema = async (maHeThongRap) => {

    const {data} = await axiosClient.get('/QuanLyRap/LayThongTinLichChieuHeThongRap', {
        params: {
            maHeThongRap: maHeThongRap,
            maNhom: maNhom,
        },
    });
    return data;
};

// Lấy thông tin thời gian chiếu của phim
export const apiMovieHours = async (movieID) => {
  const { data } = await axiosClient.get(
    "/QuanLyRap/LayThongTinLichChieuPhim",
    {
      params: {
        MaPhim: movieID,
      },
    }
  );
  return data;
};

// update phim
export const apiCapNhatPhimUpload = async (movie) => {
    // console.log(m);
    const formData = new FormData();
    for (const key in movie) {
        formData.append(key, movie[key]);
        }
    formData.append("maNhom", maNhom);
    // formData.append("maPhim", 0);
    const {data} = await axiosClient.post('/QuanLyPhim/CapNhatPhimUpload',formData);
    return data;
}

// xóa phim
export const apiXoaPhim = async (movieID) => {
  const { data } = await axiosClient.delete("/QuanLyPhim/XoaPhim", {
    params: {
      MaPhim: movieID,
    },
  });
  return data;
};

// add new phim
export const apiThemPhimUploadHinh = async (movie) => {

    // console.log(movie);
    const formData = new FormData();
    for (const key in movie) {
        formData.append(key, movie[key]);
        }
    formData.append("maNhom", maNhom);
    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    //   }
    const {data} = await axiosClient.post('/QuanLyPhim/ThemPhimUploadHinh',formData);
    // console.log(data);
    return data;
}

// thêm lịch chiếu
export const apiTaoLichChieu = async (payload) => {
    const { data } = await axiosClient.post('/QuanLyDatVe/TaoLichChieu', payload);
    return data;
};
