import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  booking: {}
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    SetBooking: (state, action) => {
       state.booking=action.payload;
    }
  },
})

export const { SetBooking } = bookingSlice.actions

const bookingSliceReducer = bookingSlice.reducer;
export default bookingSliceReducer;