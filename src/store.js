import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import regisUserReducer from './slices/regisUserSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        regisUser: regisUserReducer,
    }
})

export default store;