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
        subscriptionType: "free",
        school: "",
        payment: "",
        rememberMe: false,
        classes: [{id:"afg", content:"7C Science"}, {id:"hui", content:"7B Science"}],
    },
    reducers: {
        updated: (state, action) => {
            state[action.payload[0]] = action.payload[1]
        }
    },
})

// Action creators are generated for each case reducer function
export const { updated } = userInfoSlice.actions

export default userInfoSlice.reducer