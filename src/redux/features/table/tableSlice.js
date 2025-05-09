import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
  scheduleId: "",
  diningId: "",
  time: "",
  diningName: "",
  tables: [],
  selectedTable:""
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    SetSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    SetScheduleId: (state, action) => {
      state.scheduleId = action.payload;
    },
    SetTime: (state, action) => {
      state.time = action.payload;
    },
    SetDiningId: (state, action) => {
      state.diningId = action.payload;
    },
    SetDiningName: (state, action) => {
      state.diningName = action.payload;
    },
    SetTables: (state, action) => {
      state.tables = action.payload;
    },
    SetSelectedTable: (state, action) => {
      state.selectedTable = action.payload;
    },
  },
});

export const {
  SetSelectedDate,
  SetScheduleId,
  SetDiningId,
  SetTime,
  SetDiningName,
  SetTables,
  SetSelectedTable
} = tableSlice.actions;

const tableSliceReducer = tableSlice.reducer;
export default tableSliceReducer;
