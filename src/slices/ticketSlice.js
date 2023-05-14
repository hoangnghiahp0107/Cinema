import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiListTicket} from '../apis/dsVeAPI';

// create thunk
export const getTicket = createAsyncThunk(
    'ticket/get_ticket',
    async (bookingID) => {
        try {
            const data = await apiListTicket(bookingID);
            // console.log(data);
            return data.content;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

// initialState
const initialState = {
    danhSachGhe: [],
    thongTinPhim: [],
    carts: [],
    isLoading: false,
    error: null,
}

const ticketSlice = createSlice({
    name : 'ticket',
    initialState,
    reducers : {
        // khi book ghế sẽ thêm thông tin ghế vào carts và thêm dangChon: true
        seat_book : (state, action) => {
            const danhSachGhe = state.danhSachGhe;
            // console.log(danhSachGhe);  
            let carts;  
            const seat = action.payload;
            // console.log(seat);
            const newDanhSachGhe = danhSachGhe.map((item) => {
                if(item.maGhe === seat.maGhe) {
                    carts = [...state.carts, item]
                    return {...item, dangChon: true}
                }
                return item;
            })
            return {...state, danhSachGhe: newDanhSachGhe, carts: carts}
        },

        seat_remove : (state, action) => {
            const seat = action.payload;
            let carts = (state.carts).filter((item) => seat.maGhe !== item.maGhe);
            const newDanhSachGhe = (state.danhSachGhe).map((item) => {
                if (seat.maGhe === item.maGhe) {
                    return {...item, dangChon: false}
                }
                return item;
            })
            return {...state, danhSachGhe: newDanhSachGhe, carts: carts}
        },
        seat_cancle : (state, action) => {
            const newDanhSachGhe = (state.danhSachGhe).map((item) => {
                if (item.dangChon) {
                    return {...item, dangChon: false}
                }
                return item;
            })
            return {...state, danhSachGhe:newDanhSachGhe, carts: []}
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getTicket.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(getTicket.fulfilled, (state, action) => {
            return {...state, isLoading: false, danhSachGhe: action.payload.danhSachGhe, thongTinPhim: action.payload.thongTinPhim, error: null}
        });
        builder.addCase(getTicket.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

export const {seat_book, seat_remove, seat_cancle} = ticketSlice.actions;

export default ticketSlice.reducer;