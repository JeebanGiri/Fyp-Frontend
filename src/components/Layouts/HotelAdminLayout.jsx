import { Navigate, Outlet, useNavigate } from "react-router-dom";
import HotelAdminNavbar from "../Resuable/Navbar/HotelAdminNavbar/HotelAdminNavbar";
import { userProfile } from "../../constants/Api";
import { useQuery } from "react-query";

const HotelAdminLayout = () => {
  const navigateTo = useNavigate();
  const jwt = localStorage.getItem("token");
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery("userInfo", () =>
    userProfile(jwt)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
        localStorage.removeItem("token");
        navigateTo("/login");
      })
  );
  if (isLoading) {
    return "Loading.....";
  }
  if (isError) {
    return "Error Occured...!";
  }
  return userInfo?.role === "HOTEL_ADMIN" ? (
    <>
      <div style={{ display: "flex" }}>
        <HotelAdminNavbar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/unauthorized" />
  );
};
export default HotelAdminLayout;
