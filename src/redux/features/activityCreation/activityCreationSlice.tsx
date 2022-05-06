import { combineReducers } from "redux";
import activityCreationSettings from "./activityCreationSettings"
import activityCreationData from "./activityCreationData"
const activityCreationSlice = combineReducers({
    data: activityCreationData,
    settings: activityCreationSettings,
})
export default activityCreationSlice