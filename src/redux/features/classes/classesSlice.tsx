import { createSlice } from "@reduxjs/toolkit";
import fetchClassesData from "./asyncActions/fetchClassesData";

const classesSlice = createSlice({
    name: "classesSlice", 
    initialState: {
        data: null, 
        status: "success"
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchClassesData.pending, (state, action) => {});
        builder.addCase(fetchClassesData.rejected, (state, action) => {});
        builder.addCase(fetchClassesData.fulfilled, (state, action) => {});
    }
})
export default classesSlice