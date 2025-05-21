import { configureStore} from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import tableSliceReducer from '../features/table/tableSlice'
import userSliceReducer from '../features/user/userSlice'
import scheduleSliceReducer from '../features/schedule/scheduleSlice'
import bookingSliceReducer from '../features/booking/bookingSlice'
import diningSliceReducer from '../features/dining/diningSlice'
import reservationSliceReducer from '../features/reservation/reservationSlice'

const store = configureStore({
   reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer,
     user: userSliceReducer,
     schedule: scheduleSliceReducer,
     table: tableSliceReducer,
     booking: bookingSliceReducer,
     dining: diningSliceReducer,
     reservation: reservationSliceReducer
   },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;