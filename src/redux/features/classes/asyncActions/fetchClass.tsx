import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../../realm/RealmApp";

const fetchClass = createAsyncThunk(
  "classes/fetchClass",
  async ({ app }: { app: RealmApp }) => {}
);

export default fetchClass;
