import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener hábitos del backend
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const response = await axios.get("http://localhost:4000/habits");
  return response.data;
});

const habitsSlice = createSlice({
  name: "habits",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchHabits.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const store = configureStore({
  reducer: { habits: habitsSlice.reducer },
});