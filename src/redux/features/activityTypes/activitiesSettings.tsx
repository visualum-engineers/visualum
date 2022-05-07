import { createSlice } from "@reduxjs/toolkit"
type ActivitySettingsProps = {
    [key: string]: any;
    dndEnabled: boolean;
    userSetDnDEnabled: boolean;
    timeRemindersEnabled: boolean;
    timeIntervalDuration: number;
    autoPopUpsEnabled: boolean;
    resetPopUp: any
}
const activitiesSettingsSlice = createSlice({
    name: "activitiesSettingsSlice",
    initialState: {
        dndEnabled: true,
        userSetDnDEnabled: true,
        timeRemindersEnabled: true,
        timeIntervalDuration: 20*60*1000,
        autoPopUpsEnabled: true,
        resetPopUp: null,
    } as ActivitySettingsProps,
    reducers:{
        enableSettings: (state, action) =>{
            const newState = {...state}
            if(!Array.isArray(action.payload)) newState[action.payload] = true
            else {
                for(let i of action.payload) newState[i] = true
            }
            return newState
        },
        disableSettings: (state, action) =>{
            if(!Array.isArray(action.payload)) state[action.payload] = false
            else{
                for(let i of action.payload) state[i] = false
            }
        },
        changeTimeDuration: (state, action) =>{
            state.timeIntervalDuration = action.payload
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
    changeTimeDuration
} = activitiesSettingsSlice.actions

export default activitiesSettingsSlice.reducer