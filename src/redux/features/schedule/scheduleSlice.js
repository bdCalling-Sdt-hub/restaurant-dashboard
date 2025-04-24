import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scheduleOptions: []
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    SetScheduleOptions: (state, action) => {
      state.scheduleOptions=action.payload;
    }
  },
})

export const { SetScheduleOptions } = scheduleSlice.actions

const scheduleSliceReducer = scheduleSlice.reducer;
export default scheduleSliceReducer;