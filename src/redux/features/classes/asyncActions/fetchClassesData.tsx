import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../../realm/RealmApp";

const fetchClassesData = createAsyncThunk(
    'classes/fetchClassData', 
    async({ app }: {app: RealmApp}) => {
        
    }
);

export default fetchClassesData