import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import regisUserReducer from './slices/regisUserSlice';
import ticketSlice from './slices/ticketSlice';
import datveSlice from './slices/datVeSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        regisUser: regisUserReducer,
        ticket: ticketSlice,
        datve: datveSlice,
    }
})

export default store;