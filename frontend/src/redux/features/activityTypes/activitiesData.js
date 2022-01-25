import { 
    createSlice, 
    combineReducers
    //createAsyncThunk,
} from '@reduxjs/toolkit'
import assignmentData from "../../../app/helpers/sampleAssignmentData";
import {throttle} from "lodash"
import undoable from 'redux-undo';

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
            const singleQuestionUpdate = () =>{
                const questionData = state.clientAnswerData.questions[action.payload.questionNum]
                const newQuestionData = {
                    ...questionData, 
                    ...action.payload.data
                }
                newState = newQuestionData
                state.clientAnswerData.questions[action.payload.questionNum] = newQuestionData
            }
            switch(action.payload.type){
                case "singleQuestionUpdate":
                    singleQuestionUpdate()
                    break;
                case "singleQuestionUpdate-drag-active":
                    singleQuestionUpdate()
                    //we return early to prevent throttling 
                    //since state is update quickly on an active drag
                    return
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
    },
})
export const {
    updateActivityData
} = clientAnswerData.actions

const undoableData = undoable(clientAnswerData.reducer, {
    undoType: "activities/data/undo",
    redoType: "activities/data/redo",
    jumpType: "activities/data/jump",
    jumpToFutureType: "activities/data/jumpToFuture",
    clearHistoryType: "activities/data/clearHistory",
    limit: 100,
})
const rootReducer = combineReducers({
    originalData: activitiesData.reducer,
    clientData: undoableData
})

export default rootReducer