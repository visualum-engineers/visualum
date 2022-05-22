import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userInfoReducer from '../redux/features/userInfo/userInfoSlice';
import dashboardReducer from '../redux/features/dashboardStatus/dashboardSlice'
import activitiesReducer from  '../redux/features/activityTypes/activitiesSlice'
import activityCreationReducer from '../redux/features/activityCreation/activityCreationSlice';
import classesReducer from './features/classes/classesSlice';
const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    dashboard: dashboardReducer,
    activities: activitiesReducer,
    activityCreation: activityCreationReducer,
    classes: classesReducer
});
export const store = configureStore({
    reducer: rootReducer,
})
export type RootState = ReturnType<typeof rootReducer>;
