import { createSlice } from "@reduxjs/toolkit"
const activitiesSettingsSlice = createSlice({
    name: "activitiesSettingsSlice",
    initialState: {
        dndEnabled: true,
        resetPopUp: null,
    },
    reducers:{
        enableTap: state =>{
            state.dndEnabled = false
        },
        enableDnD: state =>{
            state.dndEnabled = true
        },
        resetPopUpOn: (state, action) => {
            state.resetPopUp = action.payload
        },
        resetPopUpOff: state => {
            state.resetPopUp = null
        },
    }
})
//export reducer meant for store       
export const {
    enableTap, 
    enableDnD, 
    resetPopUpOn, 
    resetPopUpOff,
} = activitiesSettingsSlice.actions

export default activitiesSettingsSlice.reducer