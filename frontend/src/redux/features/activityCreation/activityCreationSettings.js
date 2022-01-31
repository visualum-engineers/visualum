import { createSlice } from "@reduxjs/toolkit";
const activityCreationSettings = createSlice({
    name: "activityCreationSettingsSlice", 
    initialState: {
        previewOn: false
    },
    reducers:{
        updatePreviewState : (state, action) =>{
            state.previewOn = action.payload
        }
    }
})
export const {
    updatePreviewState,
} = activityCreationSettings.actions
export default activityCreationSettings.reducer