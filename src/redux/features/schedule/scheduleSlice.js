import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scheduleOptions: [],
  scheduleSelectedDate: null
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    SetScheduleOptions: (state, action) => {
      state.scheduleOptions=action.payload;
    },
     SetScheduleSelectedDate: (state, action) => {
      state.scheduleSelectedDate = action.payload;
    }
  },
})

export const { SetScheduleOptions, SetScheduleSelectedDate } = scheduleSlice.actions

const scheduleSliceReducer = scheduleSlice.reducer;
export default scheduleSliceReducer;