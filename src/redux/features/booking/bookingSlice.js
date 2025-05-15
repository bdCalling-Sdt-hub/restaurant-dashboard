import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  booking: {},
  bookingSelectedDate: null,
  waitlistSelectedDate: null,
  tableBookingSelectedDate: null
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    SetBooking: (state, action) => {
       state.booking=action.payload;
    },
    SetBookingSelectedDate: (state, action) => {
      state.bookingSelectedDate = action.payload;
    },
    SetWaitlistSelectedDate: (state, action) => {
      state.waitlistSelectedDate = action.payload;
    },
    SetTableBookingSelectedDate: (state, action) => {
      state.tableBookingSelectedDate = action.payload;
    }
  },
})

export const { SetBooking, SetBookingSelectedDate, SetTableBookingSelectedDate, SetWaitlistSelectedDate } = bookingSlice.actions

const bookingSliceReducer = bookingSlice.reducer;
export default bookingSliceReducer;