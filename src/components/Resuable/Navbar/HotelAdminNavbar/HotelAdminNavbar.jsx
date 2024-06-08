import { useRef, useState } from "react";
import styles from "./HotelAdminNavbar.module.css";
import SearchImg from "../../../../assets/Dashboard/searchIcon.png";
import Admin from "../../../../assets/Dashboard/hoteladmin.png";
import Notification from "../../../Notification/Notification";
import HotelAdminProfile from "../../../Dashboard/HotelAdmin/HotelAdminProfile";
import { RxDashboard } from "react-icons/rx";
import { TbFileReport } from "react-icons/tb";
import { FaHotel } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "react-dropdown-now/style.css";
import "@mui/material/styles";
import { IoNotificationsOutline } from "react-icons/io5";
import { UseOutsideClick } from "../../../../utils/useOutSideClick";
import { getHotel, userProfile } from "../../../../constants/Api";
import { useQuery } from "react-query";
import { BACKEND_URL } from "../../../../constants/constant";
import "rsuite/dist/rsuite.min.css";
import { Sidenav, Nav } from "rsuite";

const HotelAdminNavbar = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const profileBoxRef = useRef();
  const notificationBoxRef = useRef();

  UseOutsideClick(() => setShowProfileBox(false), profileBoxRef);
  UseOutsideClick(() => setShowNotificationBox(false), notificationBoxRef);

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
        <div className={styles["hotel-logo"]}>
          {hotelInfo ? (
            hotelInfo && (
              <div className={styles.logosec}>
                <div className={styles.logo}>{hotelInfo.name}</div>
              </div>
            )
          ) : (
            <div className={styles.hotelname}>
              <p>Unknown Hotel</p>
            </div>
          )}
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
          <span className={styles.notiimg} onClick={handleNotificationClick}>
            <IoNotificationsOutline ref={notificationBoxRef} />
          </span>

          <div className={styles.dp} onClick={handleProfileClick}>
            {userInfo?.data.avatar ? (
              <img
                className={styles.avatar}
                src={`${BACKEND_URL}/static/user/avatars/${userInfo?.data.avatar}`}
                alt="Profile"
                ref={profileBoxRef}
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

      <div className={styles.navcontainer} id="navcontainer" >
        <div className={styles.slidebar} >
        
          <Sidenav defaultOpenKeys={["3", "4"]} className={styles.customsidenav}> 
            <Sidenav.Body>
              <Nav className={styles.navlist} activeKey="1"> 
                <Nav.Item eventKey="1" className={styles.navitem} onClick={toggleDashboard}><RxDashboard /> Dashboard</Nav.Item>
                <Nav.Item eventKey="2" className={styles.navitem} onClick={toogleProfilePage}><ImProfile /> Profile</Nav.Item>
                <Nav.Item eventKey="3" className={styles.navitem} onClick={toogleReportPage}><TbFileReport /> Report</Nav.Item>
                <Nav.Menu eventKey="4" className={styles.hotelnav} title={<><FaHotel className={styles.faHotel} /> Hotel</>}>
                  <Nav.Item eventKey="4-1" onClick={toogleAddHotelPage} className={styles.dropdownItem}>Add Hotel</Nav.Item>
                  <Nav.Item eventKey="4-2" onClick={toogleEditHotelPage} className={styles.dropdownItem}>Edit Hotel</Nav.Item>
                  <Nav.Item eventKey="4-3" onClick={toogleViewHotelPage} className={styles.dropdownItem}>View Hotel</Nav.Item>
                </Nav.Menu>
                <Nav.Item eventKey="5" className={styles.navitem} onClick={toogleViewRoomPage}><MdOutlineBedroomParent /> Rooms</Nav.Item>
                <Nav.Item eventKey="6" className={styles.navitem} onClick={handleLogout}><FiLogOut /> Logout</Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
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
     
      
    </>
  );
};
export default HotelAdminNavbar;