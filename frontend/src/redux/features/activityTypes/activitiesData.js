import { 
    createSlice, 
    combineReducers
    //createAsyncThunk,
} from '@reduxjs/toolkit'
import assignmentData from "../../../app/helpers/sampleAssignmentData";
import {throttle} from "lodash"
import undoable, {excludeAction} from 'redux-undo';

const activityData = assignmentData

const saveToLocalStorage = ({
    state,
    payload,
    newState
}) =>{
    try{
        let storedState
        if(payload.type === "singleQuestionUpdate"){
            storedState = {...state}
            storedState.questions[payload.questionNum] = newState
        } else storedState = {...state, ...newState}
        const serizalizedState = JSON.stringify(storedState);
        localStorage.setItem(storedState.activityID, serizalizedState)
    } catch{
    }
}
const throttledSaveToStorage = throttle((newState) => saveToLocalStorage(newState), 2000)

const getDataFromLocalStorage = (data) =>{
    try{
        const newData = JSON.parse(localStorage.getItem(data.activityID))
        return newData
    } catch{
            console.log("activity not previously stored")
        return
    }
}
const singleQuestionUpdate = (state, action) =>{
    const questionData = state.clientAnswerData.questions[action.payload.questionNum]
    const newQuestionData = {
        ...questionData, 
        ...action.payload.data
    }
    state.clientAnswerData.questions[action.payload.questionNum] = newQuestionData
    return newQuestionData
}
//seperate because only client Answer Data will be undoable. 
//no need to store the same activity over and over again.
const activitiesData = createSlice({
    name: "activitiesData",
    initialState:{
        activityData: activityData,
    }
})
const clientAnswerData = createSlice({
    name: "clientAnswerActivitiesData",
    initialState: {
        clientAnswerData: getDataFromLocalStorage(activityData) ? 
                          getDataFromLocalStorage(activityData)
                          :activityData,
    },
    reducers:{
        //this action is used to update data for the use
        // of reset, undo, and localStorage capabilities
        updateActivityData : (state, action) =>{
            let newState
            switch(action.payload.type){
                case "singleQuestionUpdate":
                    newState = singleQuestionUpdate(state, action)
                    break;
                default:
                    newState = {...state.clientAnswerData}
                    newState["lastQuestionSeen"] = action.payload.lastSeenQuestion
                    state.clientAnswerData = newState  
                    break;
            }
            throttledSaveToStorage({
                state: state.clientAnswerData,
                payload: action.payload,  
                newState: newState
            })
        },
        //we created a seperate reducer, to exclude this
        //from undo, redo history.
        updateActivityDragActive: (state, action) =>{
            singleQuestionUpdate(state, action)
            return
        },
        updateActivityDataLayout: (state, action) =>{
            const newState = singleQuestionUpdate(state, action)
            throttledSaveToStorage({
                state: state.clientAnswerData,
                payload: action.payload,  
                newState: newState
            })
        },
        updateActivityTimer: (state, action) =>{
            if(!state.clientAnswerData.activityTimer) return
            //if no timer do update this action
            const startTime = new Date()
            const timerDuration = state.clientAnswerData.activityTimer
            const addHours = (timerDuration.hours * 60 * 60 * 1000)
            const addMintues = (timerDuration.minutes * 60 * 1000)
            const addSeconds = (timerDuration.seconds * 1000)
            const endTime = new Date(startTime.getTime() + addHours + addMintues + addSeconds)
            const newState = {...state.clientAnswerData, activityStartTime: startTime, activityEndTime: endTime}
            state.clientAnswerData.activityStartTime = newState.activityStartTime.toString()
            state.clientAnswerData.activityEndTime = newState.activityEndTime.toString()
            
            throttledSaveToStorage({
                state: state.clientAnswerData,
                payload: "updateTime",  
                newState: newState
            })
        }
    },
})
export const {
    updateActivityData,
    updateActivityDragActive,
    updateActivityDataLayout,
    updateActivityTimer
} = clientAnswerData.actions

const undoableData = undoable(clientAnswerData.reducer, {
    undoType: "activities/data/undo",
    redoType: "activities/data/redo",
    filter: excludeAction([
        "clientAnswerActivitiesData/updateActivityDragActive",
        "clientAnswerActivitiesData/updateActivityDataLayout",
        "clientAnswerActivitiesData/updateActivityTimer"
    ]),

    limit: 100,
})
const rootReducer = combineReducers({
    originalData: activitiesData.reducer,
    clientData: undoableData
})

export default rootReducer