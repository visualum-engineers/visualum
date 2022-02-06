import undoable, {excludeAction} from 'redux-undo';
import { combineReducers } from 'redux';
import questionFormat from './questionFormat';
import { 
    createSlice, 
    //combineReducers
    //createAsyncThunk,
} from '@reduxjs/toolkit'
const activityCreationDataUnsaved = createSlice({
    name: "activityCreationDataUnsaved",
    initialState:{
        activityName: "",
        activityDescription: "",
        activityTimer: null,
        activityTopicLabels: [],
    },
    reducers:{
        updateUnsavedTopicLabels: (state, action) =>{
            state.activityTopicLabels = action.payload
        },
        updateUnsavedActivityTimer: (state, action) =>{
            state.activityTimer = action.payload
        },
        updateUnsavedActivityName:(state, action) =>{
            state.activityName = action.payload
        },
        updateUnsavedActivityDescription: (state, action) =>{
            state.activityDescription = action.payload
        },
    }
})
export const {
    updateUnsavedTopicLabels,
    updateUnsavedActivityTimer,
    updateUnsavedActivityName,
    updateUnsavedActivityDescription
} = activityCreationDataUnsaved.actions
//mock data
const mockData = Array(10).fill(0)
const miniScreenData = mockData.map((questions, index)=>{
    return{
        key: index,
        slideType: "Label Pictures",
    }
})
const activityCreationData = createSlice({
    name: "activityCreationData",
    initialState:{
        activityName: null,
        activityDescription: null,
        activityTimer: null,
        activityTopicLabels: null,
        questions: [],
        //questions: miniScreenData
    },
    reducers:{
        updateTopicLabels: (state, action) =>{
            state.activityTopicLabels = action.payload
        },
        updateActivityTimer: (state, action) =>{
            state.activityTimer = action.payload
        },
        updateActivityName:(state, action) =>{
            state.activityName = action.payload
        },
        updateActivityDescription: (state, action) =>{
            state.activityDescription = action.payload
        },
        updateQuestionData: (state, action) =>{
            const questionNum = action.payload.questionNum
            state.questions[questionNum] = action.payload.data
        },
        addQuestion: (state, action) =>{
            const questionType = action.payload.questionType
            const initialQuestionData = questionFormat(questionType)
            let newState = [...state.questions]
            newState.push(initialQuestionData)
            state.questions = newState
        },
        deleteQuestion: (state, action) =>{
            const questionNum = parseInt(action.payload.questionNum)
            let newState = [...state.questions]
            newState.splice(questionNum, 1)
            state.questions = newState
        },
        changeQuestionPos: (state, action) =>{
            const startIndex = action.payload.startIndex
            const endIndex = action.payload.endIndex
            const questionData = action.payload.slideData
            let newState = [...state.questions]
            newState.splice(startIndex, 1)
            newState.splice(endIndex, 0, questionData)
            state.questions = newState
        },
    }

})
export const {
    updateActivityName,
    updateActivityDescription,
    updateActivityTimer,
    updateTopicLabels,
    updateQuestionData,
    addQuestion,
    deleteQuestion,
    changeQuestionPos
} = activityCreationData.actions

const  undoableData = undoable(activityCreationData.reducer,{
    undoType: "activityCreationData/undo",
    redoType: "activityCreationData/redo",
    filter: excludeAction([
        "activityCreationData/updateActivityName",
        "activityCreationData/updateActivityDescription",
        "activityCreationData/updateActivityTimer",
        "activityCreationData/updateTopicLabels",
        "activityCreationDataUnsaved/updateUnsavedActivityName",
        "activityCreationDataUnsaved/updateUnsavedActivityDescription",
        "activityCreationDataUnsaved/updateUnsavedActivityTimer",
        "activityCreationDataUnsaved/updateUnsavedTopicLabels",
        "activityCreationSettingsSlice/updateActivityEditPopUp"
    ])
})

const rootReducer = combineReducers({
    unsaved: activityCreationDataUnsaved.reducer,
    saved: undoableData
})
export default rootReducer