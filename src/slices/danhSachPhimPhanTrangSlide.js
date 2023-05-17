import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiGetMoviesPages} from '../apis/movieAPI';

export const dsPhimPhanTrang = createAsyncThunk(
    'danhSachPhimPhanTrang',
    async (value) => {
        try {
            const data = await apiGetMoviesPages(value);
            return data.content;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)


const initialState = {
    dataMovies: [],
    isLoading: false,
    error: null
}

const danhSachPhimPhanTrangSlice = createSlice({
    name: 'danhSachPhimPhanTrang',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(dsPhimPhanTrang.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(dsPhimPhanTrang.fulfilled, (state, action) => {
            return {...state, isLoading: false, dataMovies: action.payload, error: null}
        });
        builder.addCase(dsPhimPhanTrang.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
});

export default danhSachPhimPhanTrangSlice.reducer;