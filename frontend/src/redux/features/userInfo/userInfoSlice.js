import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        first: "",
        last: ""
    },
    reducers: {
        updateFirst: (state, action) => {
            state.first = action.payload;
        },
        updateLast: (state, action) => {
            state.last = action.payload;
        },
        // One of these per field? Or a generic one for all string updates?
    },
})

// Action creators are generated for each case reducer function
export const { updateFirst, updateLast } = userInfoSlice.actions

export default userInfoSlice.reducer