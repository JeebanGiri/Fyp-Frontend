import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeNavigation from "../Resuable/Navbar/HomeNavigation/HomeNavigation";
import LoginedNavigation from "../Resuable/Navbar/LoginedNavbar/LoginedNavigation";

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const role = localStorage.getItem("role");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      {isLogin == true && role === "CUSTOMER" && role === "HOTEL_ADMIN" ? (
        <LoginedNavigation />
      ) : (
        <HomeNavigation />
      )}
      <Outlet />
    </>
  );
};
export default Layout;
