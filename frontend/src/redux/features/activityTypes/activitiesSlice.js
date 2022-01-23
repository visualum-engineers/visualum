import { combineReducers } from 'redux';
import activitiesData from  './activitiesData'
import activitiesSettings from './activitiesSettings';

const activitiesSlice = combineReducers({
    data: activitiesData,
    settings: activitiesSettings
})

export default activitiesSlice