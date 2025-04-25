import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedDate: null,
  scheduleId: "",
  diningId:"",
  time: "",
  diningName:""
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    SetSelectedDate: (state, action) => {
        state.selectedDate=action.payload;
    },
    SetScheduleId: (state, action) => {
      state.scheduleId =action.payload;
    },
    SetTime: (state, action) => {
      state.time =action.payload;
    },
    SetDiningId: (state, action) => {
        state.diningId =action.payload;
    },
    SetDiningName: (state, action) => {
      state.diningName =action.payload;
  },
  },
})

export const { SetSelectedDate, SetScheduleId, SetDiningId, SetTime, SetDiningName } = tableSlice.actions

const tableSliceReducer = tableSlice.reducer;
export default tableSliceReducer;