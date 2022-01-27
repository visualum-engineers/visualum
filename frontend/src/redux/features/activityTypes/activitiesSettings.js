import { createSlice } from "@reduxjs/toolkit"
const activitiesSettingsSlice = createSlice({
    name: "activitiesSettingsSlice",
    initialState: {
        dndEnabled: true,
        timeRemindersEnabled: true,
        autoPopUpsEnabled: true,
        resetPopUp: null,
    },
    reducers:{
        enableSettings: (state, action) =>{
            if(!Array.isArray(action.payload)) state[action.payload] = true
            else {
                for(let i of action.payload) state[i] = true
            }
        },
        disableSettings: (state, action) =>{
            if(!Array.isArray(action.payload)) state[action.payload] = false
            else{
                for(let i of action.payload) state[i] = false
            }
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
    enableSettings, 
    disableSettings, 
    resetPopUpOn, 
    resetPopUpOff,
} = activitiesSettingsSlice.actions

export default activitiesSettingsSlice.reducer