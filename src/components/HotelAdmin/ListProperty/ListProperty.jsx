/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ListProperty.module.css";
import { LuMoveRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import TickImage from "../../../assets/Listing/tick.png";
import { useEffect, useState } from "react";

const ListPropertyPage = () => {
  const navigateTo = useNavigate();

  const [listType, setListType] = useState(""); // Default value
  const [animate, setAnimate] = useState(false); // State to trigger animation

  // Function to change the list type with animation
  const changeListType = (type) => {
    setAnimate(true);
    setTimeout(() => {
      setListType(type);
      setAnimate(false);
    }, 500);
  };

  // Example list types
  const listTypes = ["Hotels & Homes", "Apartments", "Vacation Homes"];

  useEffect(() => {
    // Automatically change list type every 4 seconds
    const interval = setInterval(() => {
      const currentIndex = listTypes.indexOf(listType);
      const nextIndex = (currentIndex + 1) % listTypes.length;
      changeListType(listTypes[nextIndex]);
    }, 3000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [listType, listTypes]);

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
              <span className={`${animate ? styles["slide-down"] : ""}`}>
                {listType}
              </span>
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
              <li className={styles["pop-text"]}>
                <img
                  src={TickImage}
                  alt="Right Image"
                  className={styles.icons}
                />
                45% of partners get their first booking within a week
              </li>
              <li className={styles["pop-text"]}>
                <img
                  src={TickImage}
                  alt="Right Image"
                  className={styles.icons}
                />
                More than 1.1 billion holiday rental guests since 2010
              </li>
              <li className={styles["pop-text"]}>
                <img
                  src={TickImage}
                  alt="Right Image"
                  className={styles.icons}
                />{" "}
                Full control over your property and finances
              </li>
              <li className={styles["pop-text"]}>
                <img
                  src={TickImage}
                  alt="Right Image"
                  className={styles.icons}
                />
                Registration is free and takes 15 minutes
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
      <div className={styles.buttonContainer}>
        {listTypes.map((type, index) => (
          <button
            key={index}
            onClick={() => changeListType(type)}
            className={styles.listButton}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
};

export default ListPropertyPage;
