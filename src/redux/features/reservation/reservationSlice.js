import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationSelectedDate: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    SetReservationSelectedDate: (state, action) => {
      state.reservationSelectedDate = action.payload;
    }
  },
});



export const {
    SetReservationSelectedDate
} = reservationSlice.actions;



const reservationSliceReducer = reservationSlice.reducer;
export default reservationSliceReducer;
