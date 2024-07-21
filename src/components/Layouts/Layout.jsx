import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeNavigation from "../Resuable/Navbar/HomeNavigation/HomeNavigation";
import LoginedNavigation from "../Resuable/Navbar/LoginedNavbar/LoginedNavigation";

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (isLogin && location.pathname === "/login") {
      localStorage.removeItem("token");
      window.location.reload();
      navigate("/login"); // Redirect logged-in users trying to access /login to the home page
      window.location.reload();
    }
  }, [isLogin, location, navigate]);

  return (
    <>
      {(isLogin == true && role === "CUSTOMER") ||
      (isLogin == true && role === "HOTEL_ADMIN") ? (
        <LoginedNavigation />
      ) : (
        <HomeNavigation />
      )}
      <Outlet />
    </>
  );
};
export default Layout;
