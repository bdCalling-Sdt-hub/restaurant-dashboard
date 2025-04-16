import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from '../features/auth/authSlice'
import { apiSlice } from '../features/api/apiSlice'
import UserSliceReducer from '../features/user/userSlice'

const store = configureStore({
   reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer,
     auth: authSliceReducer,
     user: UserSliceReducer
   },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store