import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import RootLayOut from "./RootLayOut";
import LoginPage from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgotPassword";
import VerificationPage from "./components/verificationComponents/VerificationPage";
import ResetPassword from "./pages/auth/resetPassword";
import BookingManagement from "./pages/bookingManagement";
import Menu from "./pages/menu";
import AddCategory from "./pages/addCategory";
import TableBooking from "./pages/tableBooking";
import MyDetails from "./pages/myDetails";
import RestaurantDetails from "./pages/restaurantDetails";
import Reviews from "./components/restaurantComponents/Reviews";
import SocialMedia from "./components/restaurantComponents/SocialMedia";
import BusinessHours from "./components/restaurantComponents/BusinessHours";
import Party from "./components/restaurantComponents/Party";
import ReservationsAgreement from "./components/restaurantComponents/ReservationsAgreement";
import MenuItems from "./components/restaurantComponents/MenuItems";
import RestaurantFeatures from "./components/restaurantComponents/RestaurantFeatures";
import Cuisine from "./components/restaurantComponents/Cuisine";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import SlotPage from "./pages/slot/SlotPage";
import SchedulePage from "./pages/schedule/SchedulePage";
import TablePage from "./pages/table/TablePage";
import TableDetailsPage from "./pages/TableDetails/TableDetailsPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PrivateRoute> <RootLayOut /> </PrivateRoute>}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route
            path="/booking-management"
            element={<BookingManagement />}
          ></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/add-category" element={<AddCategory />}></Route>
          <Route path="/table-booking" element={<TableBooking />}></Route>
          <Route path="/profile" element={<MyDetails/>}></Route>
          <Route path="/restaurant-details" element={<RestaurantDetails/>}></Route>
          <Route path="/restaurant/reviews" element={<Reviews/>}></Route>
          <Route path="/restaurant/social-media" element={<SocialMedia/>}></Route>
          <Route path="/restaurant/business-hours" element={<BusinessHours/>}></Route>
          <Route path="/restaurant/party" element={<Party/>}></Route>
          <Route path="/restaurant/cuisine" element={<Cuisine/>}></Route>
          <Route path="/restaurant/restaurant-agreement" element={<ReservationsAgreement/>}></Route>
          <Route path="/restaurant/menu-items" element={<MenuItems/>}></Route>
          <Route path="/restaurant/restaurant-features" element={<RestaurantFeatures/>}></Route>

          <Route path="/slots" element={<SlotPage/>}></Route>
          <Route path="/schedules" element={<SchedulePage/>}></Route>
          <Route path="/tables" element={<TablePage/>}></Route>

          <Route path="/table-details/:scheduleId/:diningId" element={<TableDetailsPage/>}></Route>


        </Route>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}></Route>
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>}></Route>
        <Route path="/verify-otp" element={<PublicRoute><VerificationPage /></PublicRoute>}></Route>
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>}></Route>

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
