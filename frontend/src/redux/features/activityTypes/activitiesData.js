import { 
    createSlice, 
    createAsyncThunk,
} from '@reduxjs/toolkit'
import assignmentData from "../../../app/helpers/sampleAssignmentData";
import {throttle, cloneDeep} from "lodash"
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
        console.log("not saved")
    }
}
const throttledSaveToStorage = throttle((newState) => saveToLocalStorage(newState), 1500)

const getDataFromLocalStorage = (data) =>{
    try{
        const newData = JSON.parse(localStorage.getItem(data.activityID))
        return newData
    } catch{
            console.log("get Item error")
        return
    }
}

//deep cloning takes time. Therefore it happens async
export const updateActivityData = createAsyncThunk("activites/updateActivityData", async(action) =>{
    switch(action.type){
        case "singleQuestionUpdate":
            action["data"] = cloneDeep(action.data);
            return action
        default:
            return action
    }
})

const activitiesData = createSlice({
    name: "activitiesData",
    initialState: {
        activityData: activityData,
        clientAnswerData: getDataFromLocalStorage(activityData) ? 
                          getDataFromLocalStorage(activityData)
                          :activityData,
    },
    extraReducers:{
        //this action is used to update data for the use,
        // of reset, undo, and localStorage capabilities
        //for activities. 
        [updateActivityData.fulfilled] : (state, action) =>{
            let newState
            switch(action.payload.type){
                case "singleQuestionUpdate":
                    const questionData = state.clientAnswerData.questions[action.payload.questionNum]
                    const newQuestionData = {
                        ...questionData, 
                        ...action.payload.data
                    }
                    newState = newQuestionData
                    state.clientAnswerData.questions[action.payload.questionNum] = newQuestionData
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
    },
})

export default undoable(activitiesData.reducer, {
    limit: 40,
})