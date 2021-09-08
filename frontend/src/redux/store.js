import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../redux/features/userInfo/userInfoSlice'

export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
    },
})