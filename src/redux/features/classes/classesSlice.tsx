import { createSlice } from "@reduxjs/toolkit";
import { ClassSchema } from "../../../types/ClassSchema";
import fetchClassesData from "./asyncActions/fetchClassesData";
import fetchClass from "./asyncActions/fetchClass";
export type ClassroomState = {
  data: { [Property in keyof ClassSchema]: ClassSchema[Property] };
  status: "success" | "pending" | "rejected";
};
type ClassesSliceState = {
  data:
    | null
    | ClassroomState[];
  status: "success" | "pending" | "rejected";
};
export const classesSlice = createSlice({
  name: "classesSlice",
  initialState: {
    data: null,
    status: "success",
  } as ClassesSliceState,
  reducers: {},
    extraReducers: (builder) => {
    //for all classes
    builder.addCase(fetchClassesData.pending, (state, action) => {});
    builder.addCase(fetchClassesData.rejected, (state, action) => {});
    builder.addCase(fetchClassesData.fulfilled, (state, action) => { });
    //for individual class
    builder.addCase(fetchClass.pending, (state, action) => { });
    builder.addCase(fetchClass.rejected, (state, action) => {});
    builder.addCase(fetchClass.fulfilled, (state, action) => { });
  },
});
export default classesSlice.reducer

