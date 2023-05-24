import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUsers } from "../apis/userManagementAPI";

//async action
export const getUserList = createAsyncThunk("getUserList", async () => {
  try {
    const data = await apiGetUsers();
    return data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
});

// reducer
const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      return { ...state, isLoading: true, error: null };
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      return { ...state, isLoading: false, error: null, users: action.payload };
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
  },
});

export default usersSlice.reducer;
