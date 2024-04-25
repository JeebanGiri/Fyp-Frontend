import { useEffect, useRef, useState } from "react";
import styles from "./HotelAdminNavbar.module.css";
import HotelImg from "../../../../assets/Dashboard/hotel.png";
import DashboardImg from "../../../../assets/Dashboard/dashboard.png";
import ReportImg from "../../../../assets/Dashboard/report.png";
import LogoutImg from "../../../../assets/Dashboard/logout.png";
import ProfileImg from "../../../../assets/Dashboard/profile.png";
import Bed from "../../../../assets/Room/bed.png";
import SearchImg from "../../../../assets/Dashboard/searchIcon.png";
import NotifiImg from "../../../../assets/Dashboard/notification.png";
import Admin from "../../../../assets/Dashboard/hoteladmin.png";
import Notification from "../../../Notification/Notification";
import HotelAdminProfile from "../../../Dashboard/HotelAdmin/HotelAdminProfile";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "react-dropdown-now/style.css";
import { MdAddHome } from "react-icons/md";
import "@mui/material/styles";
import { RiEdit2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { UseOutsideClick } from "../../../../utils/useOutSideClick";
// import ClickAwayListener from "@mui/material/ClickAwayListener";

const HotelAdminNavbar = () => {
  const navigateTo = useNavigate();

  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [showHotelOptions, setShowHotelOptions] = useState(false);
  const [showRoomOptions, setShowRoomOptions] = useState(false);

  const profileBoxRef = useRef();
  const notificationBoxRef = useRef();
  const hotelDropdownBox = useRef();
  const roomDropdownBox = useRef();

  UseOutsideClick(() => setShowProfileBox(false), profileBoxRef);
  UseOutsideClick(() => setShowNotificationBox(false), notificationBoxRef);
  UseOutsideClick(() => setShowHotelOptions(false), hotelDropdownBox);
  UseOutsideClick(() => setShowRoomOptions(false), roomDropdownBox);

  const handleProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowProfileBox(!showProfileBox);
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNotificationBox(!showNotificationBox);
  };

  const toggleDashboard = () => {
    navigateTo("/hoteladmin-dashboard");
  };

  const toggleHotelOptions = () => {
    // e.preventDefault();
    // e.stopPropagation();
    setShowHotelOptions(!showHotelOptions);
  };
  const toggleRoomOptions = () => {
    setShowRoomOptions(!showRoomOptions);
  };

  const toogleViewHotelPage = () => {
    navigateTo("/hoteladmin-dashboard/view-hotel");
  };
  const toogleViewRoomPage = () => {
    navigateTo("/hoteladmin-dashboard/view-rooms");
  };

  const toogleAddHotelPage = () => {
    navigateTo("/hoteladmin-dashboard/add-hotel-hoteladmin");
  };

  const toogleProfilePage = () => {
    navigateTo("/hoteladmin-dashboard/my-profiles");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/list-property/login-hoteladmin");
    window.location.reload();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logosec}>
          <div className={styles.logo}>Hotel Name</div>
        </div>
        <div className={styles.searchbar}>
          <input type="text" placeholder="Search" />
          <div className={styles.searchbtn}>
            <img
              src={SearchImg}
              className={`${styles.icn} ${styles.srchicn}`}
              alt="search-icon"
            />
          </div>
        </div>

        <div className={styles.message}>
          <span className={styles.notiimg}>
            <img
              src={NotifiImg}
              className={styles.icn}
              alt="Notification"
              ref={notificationBoxRef}
              onClick={handleNotificationClick}
            />
          </span>
          <div className={styles.dp}>
            <img
              src={Admin}
              alt="Hotel Admin Profile"
              height={40}
              width={40}
              ref={profileBoxRef}
              onClick={handleProfileClick}
            />
          </div>
        </div>
      </header>

      <div className={styles.navcontainer} id="navcontainer">
        <div className={styles.slidebar}>
          <div className={styles["nav-upper-options"]}>
            <div className={`${styles.nav_option} ${styles.option1}`}>
              <img
                src={DashboardImg}
                className={styles["nav-img"]}
                alt="dashboard"
              />
              <h5 onClick={toggleDashboard}> Dashboard</h5>
            </div>

            <div className={`${styles.nav_option} ${styles.option3}`}>
              <img src={ReportImg} className={styles["nav-img"]} alt="report" />
              <h6> Report</h6>
            </div>

            <div
              className={`${styles.nav_option} ${styles.option4}`}
              onClick={toggleHotelOptions}
            >
              <img src={HotelImg} className={styles["nav-img"]} alt="hotel" />
              <h6 className={styles.hotelmenu} ref={hotelDropdownBox}>
                <span>Hotel</span>
                <span>
                  <IoIosArrowForward className={styles["hotel-dropdown"]} />
                </span>
              </h6>
            </div>
            <div
              className={`${styles.nav_option} ${styles.option5}`}
              onClick={toggleRoomOptions}
              ref={roomDropdownBox}
            >
              <img src={Bed} className={styles["nav-img"]} alt="hotel" />
              <h6 className={styles.hotelmenu}>
                <span>Room</span>
                <span>
                  <IoIosArrowForward className={styles["hotel-dropdown"]} />
                </span>
              </h6>
            </div>

            <div className={`${styles.nav_option} ${styles.option6}`}>
              <img src={ProfileImg} className={styles["nav-img"]} alt="blog" />
              <h6 onClick={toogleProfilePage}> Profile</h6>
            </div>
            <div className={`${styles.nav_option} ${styles.logout}`}>
              <img src={LogoutImg} className={styles["nav-img"]} alt="logout" />
              <h6 onClick={handleLogout}>Logout</h6>
            </div>
          </div>
        </div>
      </div>
      {showProfileBox && <HotelAdminProfile />}
      {showNotificationBox && <Notification />}
      {showHotelOptions && (
        <div className={styles["openablebox"]}>
          <span className={styles.actions}>
            <div className={styles["hotel-add"]} onClick={toogleAddHotelPage}>
              <span>
                <MdAddHome />
              </span>
              <span className={styles.contents}>Add Hotel</span>
            </div>
            <div className={styles["hotel-update"]}>
              <span>
                <RiEdit2Fill />
              </span>
              <span className={styles.contents}>Edit Hotel</span>
            </div>
            <div className={styles["hotel-view"]} onClick={toogleViewHotelPage}>
              <span>
                <GrView />
              </span>
              <span className={styles.contents}>View Hotel</span>
            </div>
          </span>
        </div>
      )}
      {showRoomOptions && (
        <div className={styles["roombox"]}>
          <span className={styles.actions}>
            <div className={styles["hotel-update"]}>
              <span>
                <RiEdit2Fill />
              </span>
              <span className={styles.contents}>Edit Room</span>
            </div>
            <div className={styles["hotel-view"]} onClick={toogleViewRoomPage}>
              <span>
                <GrView />
              </span>
              <span className={styles.contents}>View Room</span>
            </div>
          </span>
        </div>
      )}
    </>
  );
};
export default HotelAdminNavbar;
