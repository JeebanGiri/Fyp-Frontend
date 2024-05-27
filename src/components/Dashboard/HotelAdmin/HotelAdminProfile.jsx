import styles from "./HotelAdminProfile.module.css";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
import { userProfile } from "../../../constants/Api";
import { useQuery } from "react-query";
import { LuLogOut } from "react-icons/lu";
import { BACKEND_URL } from "../../../constants/constant";

const HotelAdminProfile = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/list-property/login-hoteladmin");
    window.location.reload();
  };
  const { data: userInfo } = useQuery("get-profile", () => userProfile(token));

  const goToProfiles = () => {
    navigateTo("/hoteladmin-dashboard/edit-profile");
  };

  const handleBookingData = (e) => {
    e.preventDefault();
    navigateTo("/my-reservation");
  };

  return (
    <>
      <div className={styles.profilebox}>
        {userInfo ? (
          <div>
            <div className={styles.profileimage}>
              {userInfo.data.avatar ? (
                <img
                  className={styles.avatar}
                  src={`${BACKEND_URL}/static/user/avatars/${userInfo?.data.avatar}`}
                  alt="Profile"
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <p>
                    {userInfo.data.full_name.charAt(0).toUpperCase()}
                    {userInfo.data.full_name.split(" ")[1]
                      ? userInfo.data.full_name
                          .split(" ")[1]
                          .charAt(0)
                          .toUpperCase()
                      : null}
                  </p>
                </div>
              )}
              <p>{userInfo?.data.full_name}</p>
              <p>{userInfo?.data.email}</p>
            </div>
            <hr />
            <div className={styles["profile-items"]}>
              <span className={styles.booking}>
                <TbBrandBooking className={styles.icons} />
                <li onClick={handleBookingData}>My Booking</li>
              </span>
              <span className={styles.profiles} onClick={goToProfiles}>
                <CgProfile className={styles.icons} />
                <li>My Profile</li>
              </span>
              <span className={styles.signout} onClick={handleLogout}>
                <LuLogOut className={styles.icons} />
                <li>Logout</li>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HotelAdminProfile;
