import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
  scheduleId: "",
  diningId: "",
  time: "",
  diningName: "",
  tables: [],
  selectedTable: "",
  selectedTableName: "",
  selecetedTableSeats:0,
  tableSelectedDate: null,
  tableBookingSeats: 0,
};

const tableSlice = createSlice({
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
    SetSelectedTableSeats: (state, action) => {
      state.selecetedTableSeats = action.payload;
    },
    SetSelectedTableName: (state, action) => {
      state.selectedTableName = action.payload;
    },
    SetTableSelectedDate: (state, action) => {
      state.tableSelectedDate = action.payload;
    },
    SetTableBookingSeats: (state, action) => {
      state.tableBookingSeats = action.payload;
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
  SetSelectedTable,
  SetSelectedTableSeats,
  SetSelectedTableName,
  SetTableSelectedDate,
  SetTableBookingSeats
} = tableSlice.actions;

const tableSliceReducer = tableSlice.reducer;
export default tableSliceReducer;
