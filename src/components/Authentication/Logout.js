import { Navigate } from "react-router-dom";

function logout() {
  const token = localStorage.getItem("token");
  localStorage.removeItem(token);
  <Navigate to="/login" />;
}
export default logout;
