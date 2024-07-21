import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./ListPropertyNavbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";

const ListPropertyNavbar = () => {
  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/list-property/login-hoteladmin");
  };

  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  return (
    <>
      <nav className={styles.navigationsbar}>
        <div className={styles.navbarContainer}>
          <span className={styles.logos}>
            <li to="/" className={styles.logoContainer}>
              <Logo />
            </li>
          </span>
          <span className={styles.navItems}>
            <ul
              className={
                click ? `${styles.navMenu} ${styles.active}` : styles.navMenu
              }
            >
              <li key="already a partner" className={styles.navItem}>
                <NavLink className={styles.navLink}>Already a partner?</NavLink>
              </li>
              <li key="login" className={styles.navItem}>
                <button onClick={goToLogin}>Sign in</button>
              </li>
            </ul>
          </span>

          <div className={styles.menuIcon} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </>
  );
};
export default ListPropertyNavbar;

// login-hoteladmin
