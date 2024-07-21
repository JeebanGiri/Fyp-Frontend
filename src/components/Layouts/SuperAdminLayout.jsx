import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SuperAdminNavbar from "../Dashboard/SuperAdmin/SuperAdminNavbar";
import { useQuery } from "react-query";
import { userProfile } from "../../constants/Api";

const SuperAdminLayout = () => {
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
  return (
    <>
      {userInfo?.role === "SUPER_ADMIN" ? (
        <div style={{ display: "flex" }}>
          <SuperAdminNavbar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default SuperAdminLayout;
