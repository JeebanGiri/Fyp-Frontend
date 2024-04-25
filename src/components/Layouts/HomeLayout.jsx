import { Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";
import Footer from "../pages/Footer/Footer";

const HomeLayout = () => {
  return (
    <>
      <Home />
      {/* <Outlet /> */}
      <Footer />
    </>
  );
};

export default HomeLayout;
