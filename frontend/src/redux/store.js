import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../redux/features/userInfo/userInfoSlice';
import dashboardReducer from '../redux/features/dashboardStatus/dashboardSlice'
import activitesReducer from  '../redux/features/activityTypes/activitiesSlice'
export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
        dashboard: dashboardReducer,
        activities: activitesReducer,
    },
})