import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        selected: "home"
    },
    reducers: {
        updated: (state, action) => {
            state.selected = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updated } = dashboardSlice.actions

export default dashboardSlice.reducer