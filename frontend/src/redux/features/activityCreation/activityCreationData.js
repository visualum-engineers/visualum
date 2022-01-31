import undoable, {excludeAction} from 'redux-undo';
import questionFormat from './questionFormat';
import { 
    createSlice, 
    //combineReducers
    //createAsyncThunk,
} from '@reduxjs/toolkit'

const activityCreationData = createSlice({
    name: "activityCreationData",
    initialState:{
        activityName: "",
        activityDescription: "",
        activityTimer: null,
        questions: []
    },
    reducers:{
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
            const questionType = action.payload.questionNum
            const initialQuestionData = questionFormat(questionType)
            state.questions.push(initialQuestionData)
        },
        deleteQuestion: (state, action) =>{
            const questionNum = action.payload.questionNum
            state.questions.splice(questionNum, 1)
        },
        changeQuestionPos: (state, action) =>{
            const startIndex = action.payload.startIndex
            const endIndex = action.payload.endIndex
            const questionData = action.payload.questionData
            let newState = [...state.questions]
            newState.splice(startIndex, 1)
            newState.splice(endIndex, 0, questionData)
        }
    }

})
export const {
    updateActivityName,
    updateActivityDescription,
    updateActivityTimer,
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
        "activityCreationData/updateActivityTimer"
    ])
})
export default undoableData
// const rootReducer = combineReducers({
    
// })
//export default rootReducer