import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        selected: "home",
        collapsed: false,
        sidebarClass: "collapsable-sidebar"
    },
    reducers: {
        updated: (state, action) => {
            state.selected = action.payload
        },
        toggledCollapsed: (state, action) => {
            state.collapsed = !state.collapsed
        }
    },
})

// Action creators are generated for each case reducer function
export const { updated, toggledCollapsed } = dashboardSlice.actions

export default dashboardSlice.reducer