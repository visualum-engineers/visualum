import { createSlice } from "@reduxjs/toolkit";
const activityCreationSettings = createSlice({
    name: "activityCreationSettingsSlice", 
    initialState: {
        previewOn: false,
        activityEditPopUp: false,
        resetPopUp: false,
        sidebarToggled: true,
        addQuestionPopUp: false,
        //currQuestion: null,
        currQuestion: 0,
    },
    reducers:{
        updatePreviewState : (state, action) =>{
            state.previewOn = action.payload
        },
        updateActivityEditPopUp : (state, action) =>{
            state.activityEditPopUp = action.payload
        },
        updateResetPopUp: (state, action) =>{
            state.resetPopUp = action.payload
        },
        updateSidebarToggle: (state, action) =>{
            state.sidebarToggled = action.payload
        },
        updateAddQuestionPopUp: (state, action) =>{
            state.addQuestionPopUp = action.payload
        },
        updateCurrQuestion: (state, action) =>{
            state.currQuestion = action.payload
        }
    }
})
export const {
    updatePreviewState,
    updateActivityEditPopUp,
    updateResetPopUp,
    updateSidebarToggle,
    updateAddQuestionPopUp,
    updateCurrQuestion
} = activityCreationSettings.actions
export default activityCreationSettings.reducer