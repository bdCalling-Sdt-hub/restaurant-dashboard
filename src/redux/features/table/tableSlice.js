import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedDate: null,
  scheduleId: "",
  diningId:""
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
    SetDiningId: (state, action) => {
        state.diningId =action.payload;
      },
  },
})

export const { SetSelectedDate, SetScheduleId, SetDiningId } = tableSlice.actions

const tableSliceReducer = tableSlice.reducer;
export default tableSliceReducer;