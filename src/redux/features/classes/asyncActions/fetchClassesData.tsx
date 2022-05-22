import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../../realm/RealmApp";

const fetchClassesData = createAsyncThunk(
    'classes/fetchClassesData', 
    async({ app }: {app: RealmApp}) => {
        
    }
);

export default fetchClassesData