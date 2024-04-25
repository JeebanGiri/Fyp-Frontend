import { Outlet } from "react-router-dom";
import EditCustomerProfile from "../Profile/Customer/EditCustomerProfile";
import { userProfile } from "../../constants/Api";
import { useQuery } from "react-query";

const EditProfleLayout = () => {
  const token = localStorage.getItem("token");

  //   const [role, setRole] = useState(null);
  //   useEffect(() => {
  //     const fetchUserRole = async () => {
  //       try {
  //         const userRole = await userProfile(token);
  //         setRole(userRole);
  //       } catch (error) {
  //         console.error("Error fetching user role:", error);
  //       }
  //     };
  //     fetchUserRole();
  //   }, [token]);

  const { data } = useQuery("fetch", () => userProfile(token));
  console.log(data);
  console.log(data?.data.role);

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
