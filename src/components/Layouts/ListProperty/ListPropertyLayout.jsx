import ListPropertyNavbar from "../../Resuable/Navbar/ListPropertyNavbar/ListPropertyNavbar";
import { Outlet } from "react-router-dom";

const ListPropertyLayout = () => {

  return (
    <>
      <ListPropertyNavbar />
      <Outlet />
    </>
  );
};
export default ListPropertyLayout;
