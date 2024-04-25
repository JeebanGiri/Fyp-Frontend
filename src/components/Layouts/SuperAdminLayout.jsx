import { Outlet } from "react-router-dom";
import SuperAdminNavbar from "../Dashboard/SuperAdmin/SuperAdminNavbar";

const SuperAdminLayout = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SuperAdminNavbar />
        <Outlet />
      </div>
    </>
  );
};
export default SuperAdminLayout;
