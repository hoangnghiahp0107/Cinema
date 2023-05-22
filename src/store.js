import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import regisUserReducer from "./slices/regisUserSlice";
import ticketSlice from "./slices/ticketSlice";
import datveSlice from "./slices/datVeSlice";
import infoUserSlice from "./slices/infoUserSlice";
import danhSachPhimPhanTrangSlide from "./slices/danhSachPhimPhanTrangSlide";
import userListSlice from "./slices/userListSlice";
import userListPageSlice from "./slices/userListPageSlice";
import adminCreateUserSlice from "./slices/createUserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    regisUser: regisUserReducer,
    ticket: ticketSlice,
    datve: datveSlice,
    infoUser: infoUserSlice,
    listMoviePage: danhSachPhimPhanTrangSlide,
    userList: userListSlice,
    userListPage: userListPageSlice,
    createUser: adminCreateUserSlice,
  },
});

export default store;
