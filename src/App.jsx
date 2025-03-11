
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import RootLayOut from "./RootLayOut";
import LoginPage from "./pages/auth/login";
import AboutUs from "./pages/about";
import TermsConditions from "./pages/terms";
import FaqPage from "./pages/faqs";
import PrivacyPolicy from "./pages/privacyPolicy";
import SettingPage from "./pages/settings";
import ForgotPassword from "./pages/auth/forgotPassword";
import VerificationPage from "./components/verificationComponents/VerificationPage";
import ResetPassword from "./pages/auth/resetPassword";
import BookingManagement from "./pages/bookingManagement";
import Menu from "./pages/menu";
import AddCategory from "./pages/addCategory";
import UserManagement from "./pages/userManagement";
import TableBooking from "./pages/tableBooking";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        
          <Route element={<RootLayOut/>}>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/booking-management" element={<BookingManagement/>}></Route>
            <Route path="/menu" element={<Menu/>}></Route>
            <Route path="/add-category" element={<AddCategory/>}></Route>
            <Route path="/table-booking" element={<TableBooking/>}></Route>
            <Route path="/user-management" element={<UserManagement/>}></Route>
         

            
          </Route>


          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/verification" element={<VerificationPage/>}></Route>
          <Route path="/reset-password" element={<ResetPassword/>}></Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
