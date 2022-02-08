import undoable, {excludeAction} from 'redux-undo';
import questionFormat from './questionFormat';
import { 
    createSlice, 
    combineReducers
    //createAsyncThunk,
} from '@reduxjs/toolkit'
import questionUpdate from './questionUpdate';
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

const activityCreationData = createSlice({
    name: "activityCreationData",
    initialState:{
        activityName: null,
        activityDescription: null,
        activityTimer: null,
        activityTopicLabels: null,
        questions: [questionFormat("sort")],
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
            const questionType = action.payload.questionType
            const questionNum = parseInt(action.payload.questionNum)
            const updateData = questionUpdate({
                type: questionType,
                oldData: {...state.questions[questionNum]},
                newData: action.payload
            })
            if(!updateData) return
            state.questions[questionNum] = updateData
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
        //this reducer is to update data in redux, but
        //it will be ignored by the history stack meaning
        //changes will not be recorded in undo, and redo actions
        // use this carefully and only when no other
        // option exists
        updateQuestionDataIgnore: (state, action) =>{
            const questionType = action.payload.questionType
            const questionNum = parseInt(action.payload.questionNum)
            const updateData = questionUpdate({
                type: questionType,
                oldData: {...state.questions[questionNum]},
                newData: action.payload
            })
            if(!updateData) return
            state.questions[questionNum] = updateData
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
    changeQuestionPos,
    updateQuestionDataIgnore,
} = activityCreationData.actions

const  undoableData = undoable(activityCreationData.reducer,{
    undoType: "activityCreationData/undo",
    redoType: "activityCreationData/redo",
    filter: excludeAction([
        "activityCreationData/updateActivityName",
        "activityCreationData/updateActivityDescription",
        "activityCreationData/updateActivityTimer",
        "activityCreationData/updateTopicLabels",
        "activityCreationData/updateQuestionDataIgnore",
        //have to ignore these, since using combine reducers will add them
        //to the history stack if not managed 
        "activityCreationDataUnsaved/updateUnsavedActivityName",
        "activityCreationDataUnsaved/updateUnsavedActivityDescription",
        "activityCreationDataUnsaved/updateUnsavedActivityTimer",
        "activityCreationDataUnsaved/updateUnsavedTopicLabels",
        //have to ignore these setting actions because when we combine reducers
        //these will still be added to the history stack
        "activityCreationSettingsSlice/updateActivityEditPopUp",
        "activityCreationSettingsSlice/updatePreviewState",
        "activityCreationSettingsSlice/updateResetPopUp",
        "activityCreationSettingsSlice/updateSidebarToggle",
        "activityCreationSettingsSlice/updateAddQuestionPopUp",
    ])
})

const rootReducer = combineReducers({
    unsaved: activityCreationDataUnsaved.reducer,
    saved: undoableData
})
export default rootReducer