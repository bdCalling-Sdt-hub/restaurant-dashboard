import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from '../features/auth/authSlice'
import { apiSlice } from '../features/api/apiSlice'
import tableSliceReducer from '../features/table/tableSlice'
import userSliceReducer from '../features/user/userSlice'
import scheduleSliceReducer from '../features/schedule/scheduleSlice'

const store = configureStore({
   reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer,
     auth: authSliceReducer,
     user: userSliceReducer,
     schedule: scheduleSliceReducer,
     table: tableSliceReducer
   },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store