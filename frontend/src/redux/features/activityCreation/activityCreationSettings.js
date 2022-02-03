import { createSlice } from "@reduxjs/toolkit";
const activityCreationSettings = createSlice({
    name: "activityCreationSettingsSlice", 
    initialState: {
        previewOn: false,
        activityEditPopUp: false,

    },
    reducers:{
        updatePreviewState : (state, action) =>{
            state.previewOn = action.payload
        },
        updateActivityEditPopUp : (state, action) =>{
            state.activityEditPopUp = action.payload
        }
    }
})
export const {
    updatePreviewState,
    updateActivityEditPopUp
} = activityCreationSettings.actions
export default activityCreationSettings.reducer