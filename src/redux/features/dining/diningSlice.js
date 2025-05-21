import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  diningOptions: []
}

export const diningSlice = createSlice({
  name: 'dining',
  initialState,
  reducers: {
    SetDiningOptions: (state, action) => {
      state.diningOptions=action.payload;
    }
  },
})

export const { SetDiningOptions } = diningSlice.actions

const diningSliceReducer = diningSlice.reducer;
export default diningSliceReducer;