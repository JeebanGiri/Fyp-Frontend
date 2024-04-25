import { Navigate, useNavigate } from "react-router-dom";
import Unauthorized from "../../../assets/Unauthorized/authorization.jpg";
import styles from "./UnauthorizedPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

const UnauthorizedPage = () => {
  const navigateTo = useNavigate();
  const handlePrevious = () => {
    navigateTo('/')
    console.log("prev");
  };
  return (
    <>
      <div className={styles.images}>
        <img src={Unauthorized} alt="" />
      </div>
      <span className={styles.homes} onClick={handlePrevious}>
        <div className="homes">
          <FaArrowLeft /> Back To Home
        </div>
      </span>
    </>
  );
};

export default UnauthorizedPage;
