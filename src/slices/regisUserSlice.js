import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { apiSignUp } from '../apis/userAPI';


export const signup = createAsyncThunk(
    'user/signup',
    async (value) => {
        try {
            const data = await apiSignUp(value);
            return data.content;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    user: null,
    isLoading: false,
    error: null
}

const regisUserSlice = createSlice ({
    name : 'user',
    initialState,
    reducers: {
        removeRegisUser: (state, action) => {
            return {...state, user: null}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            return {...state, isLoading: false, user: action.payload, error: null}
        });
        builder.addCase(signup.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

export const {removeRegisUser} = regisUserSlice.actions;

export default regisUserSlice.reducer;