import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        firstName: "",
        lastName: "",
        accountType: "student",
        email: "",
        password: "",
        verifiedPassword: "",
        exposureToUs: "",
        existingAccount: false,
        verifiedEmailCode: "",
        classCode: "",
        schoolCode: "",
        subscriptionType: "",
        school: "",
        payment: "",
        rememberMe: false
    },
    reducers: {
        updatedFirst: (state, action) => {
            state["firstName"] = action.paylod
        },
        updateLast: (state, action) => {
            state.last = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload
        },
        updatePassword: (state, action) => {
            state.password = action.payload
        },
        updateClassCode: (state, action) => {
            state.classCode = action.payload
        },
        // One of these per field? Or a generic one for all string updates?
    },
})

// Action creators are generated for each case reducer function
export const { updateFirst, updateLast, updateEmail, updatePassword, updateClassCode } = userInfoSlice.actions

export default userInfoSlice.reducer