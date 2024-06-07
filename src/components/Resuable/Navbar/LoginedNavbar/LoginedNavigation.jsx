import {useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import style from "./LoginedNavigation.module.css";
import Logo from "../Logo";
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Notification from "../../../Notification/Notification";
import Profile from "../../../Dashboard/Profile";
import { UseOutsideClick } from "../../../../utils/useOutSideClick";

const LoginedNavigation = () => {
  const [click, setClick] = useState(false);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const profileBoxRef = useRef();
  const notificationBoxRef = useRef();
  UseOutsideClick(() => setShowProfileBox(false), profileBoxRef);
  UseOutsideClick(() => setShowNotificationBox(false), notificationBoxRef);

  const handleProfileClick = (e) => {
    // Prevent the click event from propagating to document level
    e.preventDefault();
    e.stopPropagation();
    console.log("Handle clik profile");
    // Toggle the profile box (modal)
    setShowProfileBox(!showProfileBox);
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();
    // Prevent the click event from propagating to document level
    e.stopPropagation();
    // Toggle the profile box (modal)
    setShowNotificationBox(!showNotificationBox);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const notifi = <IoNotifications size={25} />;
  const profile = <CgProfile size={30} />;

  return (
    <>
      <nav className={style["login-nav"]}>
        <div className={style.loginedNavbarWrapper}>
          <div className={style.logoContainer}>
            <Logo />
          </div>
          <div className={style.navListContainer}>
            <ul
              className={
                click ? `${style.navmenu} ${style.active}` : style.navmenu
              }
            >
              <li key="home" className={style.navItems}>
                <NavLink to="/" exact="true" onClick={handleClick}>
                  Hotels & Homes
                </NavLink>
              </li>

              <li key="notification" className={style.navItems}>
                <NavLink
                  to="/#"
                  ref={notificationBoxRef}
                  onClick={handleNotificationClick}
                >
                  {notifi}
                </NavLink>
              </li>
              <li key="profile" className={style.navItems}>
                <NavLink
                  to="#"
                  ref={profileBoxRef}
                  onClick={handleProfileClick}
                >
                  {profile}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={style.menuIconWrapper} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
      {showProfileBox && (
        <div id="profile-box" ref={profileBoxRef}>
          <Profile />
        </div>
      )}
      {showNotificationBox && (
        <div id="notification-box" ref={notificationBoxRef}>
          <Notification />
        </div>
      )}
    </>
  );
};

export default LoginedNavigation;
