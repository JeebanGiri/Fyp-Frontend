import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layouts/Layout";
import LoginedSearchbar from "./components/Resuable/Searchbar/Logined-Searchbar/LoginedSearchBar";
import Register from "./components/Authentication/Register/Register";
import EmailVerification from "./components/Authentication/Verification/EmailVerification";
import RoomLanding from "./components/pages/Room/RoomLanding/RoomLanding";
import LoginHotelAdmin from "./components/HotelAdmin/LoginHotelAdmin/LoginHotelAdmin";
import HomeLayout from "./components/Layouts/HomeLayout";
import SearchBar from "./components/Resuable/Searchbar/Home-Searchbar/Searchbar";
import HotelAdminLayout from "./components/Layouts/HotelAdminLayout";
import AddHotel from "./components/pages/Hotel/AddHotel/AddHotel";
import EditHotel from "./components/pages/Hotel/EditHotel/EditHotel";
import ViewRoom from "./components/pages/Room/ViewRooms/ViewRoom";
import ForgetPassword from "./components/Authentication/ForgetPassword/ForgetPassword";
import HotelLanding from "./components/pages/Hotel/HotelLanding/HotelLanding";
import Rating from "./components/pages/Rating/Rating";
import PageNotFound from "./utils/PageNotFound";
import Reservation from "./components/pages/Reservation/Reservation";
import Stay from "./components/Resuable/Searchbar/Home-Searchbar/Stay";
import Apartment from "./components/Resuable/Searchbar/Home-Searchbar/Apartment";
import ListPropertyLayout from "./components/Layouts/ListPropertyLayout";
import RegisterHotelAdmin from "./components/HotelAdmin/RegisterHotelAdmin/RegisterHotelAdmin";
import ListPropertyPage from "./components/HotelAdmin/ListProperty/ListProperty";
import HotelAdminDashboard from "./components/Dashboard/HotelAdmin/HotelAdminDashboard";
import ViewHotel from "./components/pages/Hotel/ViewHotel/ViewHotel";
import SuperAdminLayout from "./components/Layouts/SuperAdminLayout";
import UnauthorizedPage from "./components/HotelAdmin/UnauthorizedPage/UnauthorizedPage";
import ViewBooking from "./components/pages/Reservation/ViewReservation/CutomerReservation";
import AddRoomsPopup from "./components/pages/Room/AddRoomsForms/AddRoomsPopup";
import HotelLocationMap from "./components/pages/Map/HotelLocationMap";
import AddHotels from "./components/Dashboard/SuperAdmin/AddHotels";
import SuperAdminDashboard from "./components/Dashboard/SuperAdmin/SuperAdminDashboard";
import ChangePassword from "./components/Profile/ChangePassword";
import ViewHotelLocation from "./components/pages/Map/ViewHotelLocation";
import EditProfileLayout from "./components/Layouts/EditProfileLayout";
import ChangePhone from "./components/Profile/ChangePhone";
import ChangePersonaldetails from "./components/Profile/ChangePersonalDetails";
import Login from "./components/Authentication/Login/Login";
import { setupNotifications } from "./utils/Firebase";
import CustomerReport from "./components/Dashboard/Report/CustomerReport";
import ReportPage from "./components/Dashboard/HotelAdmin/ReportPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  setupNotifications();

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        draggable
        pauseOnHover
        style={{ fontSize: "14px" }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<SearchBar />} />
            <Route path="stay" element={<Stay />} />
            <Route path="apartment" element={<Apartment />} />
          </Route>
          <Route path="/hotel-landing" element={<HotelLanding />} />
          <Route path="/maps" element={<HotelLocationMap />} />
          <Route path="/room-landing/:hotelId/" element={<RoomLanding />} />
          <Route path="/landing-searchbar" element={<LoginedSearchbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/booking" element={<Reservation />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/loginas-admin" element={<LoginHotelAdmin />} />
          <Route path="/my-reservation" element={<ViewBooking />} />
          <Route path="/view-location" element={<ViewHotelLocation />} />
          <Route path="/edit-profile" element={<EditProfileLayout />}>
            <Route path="" element={<ChangePersonaldetails />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-phone" element={<ChangePhone />} />
          </Route>
        </Route>
        <Route path="/list-property" element={<ListPropertyLayout />}>
          <Route path="" element={<ListPropertyPage />} />
          <Route path="register-hoteladmin" element={<RegisterHotelAdmin />} />
          <Route path="login-hoteladmin" element={<LoginHotelAdmin />} />
        </Route>
        <Route path="/hoteladmin-dashboard" element={<HotelAdminLayout />}>
          <Route path="" element={<HotelAdminDashboard />} />
          <Route path="add-hotel-hoteladmin" element={<AddHotel />} />
          <Route path="my-reservation" element={<ViewBooking />} />
          <Route path="edit-hotel" element={<EditHotel />} />
          <Route path="view-rooms" element={<ViewRoom />} />
          <Route path="view-hotel" element={<ViewHotel />} />
          <Route path="add-rooms" element={<AddRoomsPopup />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="generate-report" element={<CustomerReport />} />

          <Route
            path="/hoteladmin-dashboard/edit-profile"
            element={<EditProfileLayout />}
          >
            <Route path="" element={<ChangePersonaldetails />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-phone" element={<ChangePhone />} />
          </Route>
        </Route>
        <Route
          path="/superadmin-dashboard"
          element={<SuperAdminLayout />}
          exact
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="hotels" element={<AddHotels />} />
        </Route>
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="cus-reports" element={<CustomerReport />} />
      </Routes>
    </div>
  );
}

export default App;
