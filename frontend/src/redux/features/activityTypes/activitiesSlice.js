import { createSlice } from '@reduxjs/toolkit'

const activitiesSlice = createSlice({
    name: "activitiesSlice",
    initialState: {
        dndEnabled: true,
    },
    reducers:{
        enableTap: state =>{
            state.dndEnabled = false
        },
        enableDnD: state =>{
            state.dndEnabled = true
        }
    }
})
//export reducer meant for store       
export const {enableTap, enableDnD} = activitiesSlice.actions

export default activitiesSlice.reducer