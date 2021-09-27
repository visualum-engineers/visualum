import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../redux/features/userInfo/userInfoSlice';
import dashboardReducer from '../redux/features/dashboardStatus/dashboardSlice'

export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
        dashboard: dashboardReducer
    },
})