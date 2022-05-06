import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userInfoReducer from '../redux/features/userInfo/userInfoSlice';
import dashboardReducer from '../redux/features/dashboardStatus/dashboardSlice'
import activitiesReducer from  '../redux/features/activityTypes/activitiesSlice'
import activityCreationReducer from '../redux/features/activityCreation/activityCreationSlice';
const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    dashboard: dashboardReducer,
    activities: activitiesReducer,
    activityCreation: activityCreationReducer,
});
export const store = configureStore({
    reducer: rootReducer,
})
export type RootState = ReturnType<typeof rootReducer>;
