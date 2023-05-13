import axiosClient from "./axiosClient";


// lấy ds lịch chiếu phim
export const apiGetMovies = async () => {
    const {data} = await axiosClient.get('/QuanLyPhim/LayDanhSachPhim', {
        params: {
            maNhom: 'GP03',
        }
    });
    return data;
};

// lấy banner
export const apiGetBanners = async () => {
    const {data} = await axiosClient.get('/QuanLyPhim/LayDanhSachBanner');
    return data;
};

// lấy thông tin chung phim đang chiếu và sắp chiếu
export const apiGetMovieDetails = async (movieID) => {
    const {data} = await axiosClient.get('/QuanLyPhim/LayThongTinPhim', {
        params: {
            MaPhim: movieID,
        },
    });
    return data;
};


// lấy thông tin list HeThongRap (CGV, BHD...)
export const apiGetListHeThongCumRap = async (maHeThongRap) => {
    const {data} = await axiosClient.get('/QuanLyRap/LayThongTinHeThongRap', {
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
            maNhom: 'GP03',
        },
    });
    return data;
};

export const apiLayThongTinLichChieuPhim = async (MaPhim) => {
    const {data} = await axiosClient.get('/QuanLyRap/LayThongTinLichChieuPhim', {
        params: {
            MaPhim: MaPhim,
        },
    });
    return data;
}

