import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayOut from "./RootLayOut";
import LoginPage from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgotPassword";
import VerificationPage from "./components/verificationComponents/VerificationPage";
import ResetPassword from "./pages/auth/resetPassword";
import BookingManagement from "./pages/bookingManagement";
import Menu from "./pages/menu";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import SlotPage from "./pages/slot/SlotPage";
import SchedulePage from "./pages/schedule/SchedulePage";
import ScheduleDetailsPage from "./pages/schedule/ScheduleDetailsPage";
import TablePage from "./pages/table/TablePage";
import TableDetailsPage from "./pages/TableDetails/TableDetailsPage";
import TableBookingListPage from "./pages/tableBookingList/TableBookingListPage";
import DiningPage from "./pages/dining/DiningPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import RestaurantPage from "./pages/restaurant/RestaurantPage";
import WaitlistPage from "./pages/waitlist/WaitlistPage";
import AssignTablePage from "./pages/assignTable/AssignTablePage";
import ReservationCalendarPage from "./pages/ReservationCalendar/ReservationCalendarPage";
import LocationForm from "./components/form/LocationForm";
import UpdateLocationPage from "./pages/location/UpdateLocationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ReviewPage from "./pages/review/ReviewPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PrivateRoute> <RootLayOut /> </PrivateRoute>}>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/" element={<RestaurantPage />}></Route>
          <Route
            path="/booking-management"
            element={<BookingManagement />}
          ></Route>
          <Route
            path="/waitlist"
            element={<WaitlistPage />}
          ></Route>

          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/map" element={<LocationForm />}></Route>
           <Route path="/restaurant/update-location" element={<UpdateLocationPage />}></Route>

          {/* <Route path="/table-booking" element={<TableBooking />}></Route> */}
          <Route path="/assign-table/:bookingId" element={<AssignTablePage />}></Route>
          <Route path="/table-booking-list" element={<TableBookingListPage />}></Route>
          <Route path="/reservation-calendar" element={<ReservationCalendarPage />}></Route>

          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/reviews" element={<ReviewPage/>}></Route>
          <Route path="/restaurant" element={<RestaurantPage/>}></Route>
          <Route path="/dining" element={<DiningPage/>}></Route>
          <Route path="/slots" element={<SlotPage/>}></Route>
          <Route path="/schedules" element={<SchedulePage/>}></Route>
          <Route path="/schedule-details/:date" element={<ScheduleDetailsPage/>}></Route>
          <Route path="/tables" element={<TablePage/>}></Route>
          <Route path="/tables/details/:scheduleId/:diningId" element={<TableDetailsPage/>}></Route>


        </Route>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}></Route>
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>}></Route>
        <Route path="/verify-otp" element={<PublicRoute><VerificationPage /></PublicRoute>}></Route>
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>}></Route>
        <Route path="*" element={<NotFoundPage/>}/>

      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
