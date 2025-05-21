import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    access: [],
    role: ""
  },
  reducers: {
    SetAccess: (state, action) => {
      state.access=action.payload['access'];
      state.role=action.payload['role'];
    },
  }
})

export const { SetAccess } = userSlice.actions

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;