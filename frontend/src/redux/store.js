import {configureStore} from '@reduxjs/toolkit'
import userInfoReducer from '../redux/features/userInfo/userInfoSlice';
import dashboardReducer from '../redux/features/dashboardStatus/dashboardSlice'
import activitiesReducer from  '../redux/features/activityTypes/activitiesSlice'
import activityCreationReducer from '../redux/features/activityCreation/activityCreationSlice';
export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
        dashboard: dashboardReducer,
        activities: activitiesReducer,
        activityCreation: activityCreationReducer
    },
})