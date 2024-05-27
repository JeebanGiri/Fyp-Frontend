import { useRef, useState } from "react";
import styles from "./HotelAdminNavbar.module.css";
import SearchImg from "../../../../assets/Dashboard/searchIcon.png";
import Admin from "../../../../assets/Dashboard/hoteladmin.png";
import Notification from "../../../Notification/Notification";
import HotelAdminProfile from "../../../Dashboard/HotelAdmin/HotelAdminProfile";
import { IoIosArrowForward } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { TbFileReport } from "react-icons/tb";
import { FaHotel } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "react-dropdown-now/style.css";
import { MdAddHome } from "react-icons/md";
import "@mui/material/styles";
import { RiEdit2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { IoNotificationsOutline } from "react-icons/io5";
import { UseOutsideClick } from "../../../../utils/useOutSideClick";
import { getHotel, userProfile } from "../../../../constants/Api";
import { useQuery } from "react-query";
import { BACKEND_URL } from "../../../../constants/constant";
// import ClickAwayListener from "@mui/material/ClickAwayListener";

const HotelAdminNavbar = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

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

  const { data: userInfo } = useQuery("get-profile", () => userProfile(token));

  const toggleDashboard = () => {
    navigateTo("/hoteladmin-dashboard");
  };

  const toggleHotelOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const toogleEditHotelPage = () => {
    navigateTo("/hoteladmin-dashboard/edit-hotel");
  };

  const toogleReportPage = () => {
    navigateTo("/hoteladmin-dashboard/reports");
  };

  const toogleProfilePage = () => {
    navigateTo("/hoteladmin-dashboard/edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/list-property/login-hoteladmin");
    window.location.reload();
  };

  const { data: fetchHotelInfo } = useQuery("hotel-info", () =>
    getHotel(token)
  );
  const hotelInfo = fetchHotelInfo?.data;

  return (
    <>
      <header className={styles.header}>
        {hotelInfo
          ? hotelInfo && (
              <div className={styles.logosec}>
                <div className={styles.logo}>{hotelInfo.name}</div>
              </div>
            )
          : null}
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
          <span className={styles.notiimg} onClick={handleNotificationClick}>
            <IoNotificationsOutline ref={notificationBoxRef} />
          </span>

          <div className={styles.dp} onClick={handleProfileClick}>
            {userInfo?.data.avatar ? (
              <img
                className={styles.avatar}
                src={`${BACKEND_URL}/static/user/avatars/${userInfo?.data.avatar}`}
                alt="Profile"
              />
            ) : (
              <img
                src={Admin}
                alt="Hotel Admin Profile"
                height={40}
                width={40}
                ref={profileBoxRef}
              />
            )}
          </div>
        </div>
      </header>

      <div className={styles.navcontainer} id="navcontainer">
        <div className={styles.slidebar}>
          <div className={styles["nav-upper-options"]}>
            <div className={`${styles.nav_option} ${styles.option1}`}>
              <RxDashboard />
              <h5 onClick={toggleDashboard}> Dashboard</h5>
            </div>

            <div className={`${styles.nav_option} ${styles.option3}`}>
              <TbFileReport />
              <h6 onClick={toogleReportPage}> Report</h6>
            </div>
            <div
              className={`${styles.nav_option} ${styles.option4}`}
              onClick={toggleHotelOptions}
            >
              <FaHotel />
              <h6 className={styles.hotelmenu} ref={hotelDropdownBox}>
                <span>Hotel</span>
                <span>
                  <IoIosArrowForward className={styles["hotel-dropdown"]} />
                </span>
              </h6>
            </div>
            <div
              className={`${styles.nav_option} ${styles.option5}`}
              onClick={toogleViewRoomPage}
              ref={roomDropdownBox}
            >
              <MdOutlineBedroomParent />
              <h6 className={styles.hotelmenu}>
                <span>Room</span>
                {/* <span>
                  <IoIosArrowForward className={styles["hotel-dropdown"]} />
                </span> */}
              </h6>
            </div>

            <div className={`${styles.nav_option} ${styles.option6}`}>
              <ImProfile />
              <h6 onClick={toogleProfilePage}> Profile</h6>
            </div>
            <div className={`${styles.nav_option} ${styles.logout}`}>
              <FiLogOut />
              <h6 onClick={handleLogout}>Logout</h6>
            </div>
          </div>
        </div>
      </div>
      {showProfileBox && (
        <div ref={profileBoxRef}>
          <HotelAdminProfile />
        </div>
      )}
      {showNotificationBox && (
        <div ref={notificationBoxRef}>
          <Notification />
        </div>
      )}
      {showHotelOptions && (
        <div className={styles["openablebox"]}>
          <span className={styles.actions}>
            <div className={styles["hotel-add"]} onClick={toogleAddHotelPage}>
              <span>
                <MdAddHome />
              </span>
              <span className={styles.contents}>Add Hotel</span>
            </div>
            <div
              className={styles["hotel-update"]}
              onClick={toogleEditHotelPage}
            >
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
      {/* {showRoomOptions && (
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
      )} */}
    </>
  );
};
export default HotelAdminNavbar;
