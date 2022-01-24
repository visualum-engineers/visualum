import { combineReducers } from 'redux';
// import { createReducer, createAction} from '@reduxjs/toolkit';
// import {ActionCreators} from "redux-undo"
// const undo = createAction("activities/data/undo")
// const redo = createAction("activities/data/redo")

import activitiesData from  './activitiesData'
import activitiesSettings from './activitiesSettings';
const activitiesSlice = combineReducers({
        data: activitiesData,
        settings: activitiesSettings
    })
export default activitiesSlice