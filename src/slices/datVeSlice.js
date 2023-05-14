import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {datveAPI} from '../apis/datveAPI';

export const datve = createAsyncThunk(
    'bookingMovies',
    async (value) => {
        try {
            const data = await datveAPI(value);
            return data.content;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listTicket: [],
    isLoading: false,
    error: null
}
const datveSlice = createSlice ({
    name: 'bookingMovies',
    initialState,
    reducers: {
        booking_remove: (state, action) => {
            return {...state, listTicket: []}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(datve.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(datve.fulfilled, (state, action) => {
            return {...state, isLoading: false, listTicket: action.payload, error: null}
        });
        builder.addCase(datve.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

export const {booking_remove} = datveSlice.actions;

export default datveSlice.reducer;