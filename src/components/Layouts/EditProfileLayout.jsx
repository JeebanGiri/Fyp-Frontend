import { Outlet } from "react-router-dom";
import EditCustomerProfile from "../Profile/Customer/EditCustomerProfile";
import { userProfile } from "../../constants/Api";
import { useQuery } from "react-query";

const EditProfleLayout = () => {
  const token = localStorage.getItem("token");
  const { data } = useQuery("fetch", () => userProfile(token));

  return (
    <>
      <div
        style={{ display: "flex", marginTop: "40px", justifyContent: "center" }}
      >
        <>
          <EditCustomerProfile />
          <Outlet />
        </>
      </div>
    </>
  );
};

export default EditProfleLayout;
