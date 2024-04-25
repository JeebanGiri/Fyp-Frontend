import styles from "./ListProperty.module.css";
import { LuMoveRight } from "react-icons/lu";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const ListPropertyPage = () => {
  const navigateTo = useNavigate();

  const toogleRegisterPage = () => {
    navigateTo("/list-property/register-hoteladmin");
  };
  return (
    <>
      <div className={styles["property-list"]}>
        <div className={styles["text-content"]}>
          <aside>
            <h2>
              <span>List</span>
              <span>Anythings</span>
              <span>On Horizon Residence</span>
            </h2>
            <p>
              Unlock the World: List Your Holiday Home with Us Today! Experience
              the joy of sharing your unique space with travelers from around
              the globe.
            </p>
          </aside>
        </div>
        <div className={styles["box-content"]}>
          <span className={styles.contentbox}>
            <div className={styles.titles}>
              <h5>Earn more with consistent bookings</h5>
            </div>
            <ul className={styles.policy}>
              <li>
                <LiaHandPointRightSolid className={styles.icons} /> 45% of
                partners get their first booking within a week
              </li>
              <li>
                <LiaHandPointRightSolid className={styles.icons} /> More than
                1,1 billion holiday rental guests since 2010
              </li>
              <li>
                <LiaHandPointRightSolid className={styles.icons} /> Full control
                over your property and finances
              </li>
              <li>
                <LiaHandPointRightSolid className={styles.icons} /> Registration
                is free and takes 15 minutes
              </li>
            </ul>
            <div className={styles.line}>
              <hr />
            </div>
            <div className={styles["get-start"]}>
              <button onClick={toogleRegisterPage}>
                Get Started Now <LuMoveRight className={styles.arrow} />
              </button>
            </div>
            <div className={styles.line}>
              <hr />
            </div>
            <div className={styles["footer-content"]}>
              <b>Already started a registration?</b>
              <p onClick={toogleRegisterPage}>Continue your registration</p>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};
export default ListPropertyPage;
