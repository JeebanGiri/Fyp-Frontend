import styles from "./Profile.module.css";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { useQuery } from "react-query";
import { userProfile } from "../../constants/Api";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { BACKEND_URL } from "../../constants/constant";

const Profile = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  const handleEditProfile = (e) => {
    e.preventDefault();
    navigateTo("/edit-profile");
  };

  const handleBookingData = (e) => {
    e.preventDefault();
    navigateTo("/my-reservation");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/");
    window.location.reload();
  };

  const { data: userInfo } = useQuery("get-profile", () => userProfile(token));

  return (
    <>
      {userInfo ? (
        <div className={styles.profilebox}>
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
                    : ""}
                </p>
              </div>
            )}
            <p>{userInfo?.data.full_name}</p>
            <p>{userInfo?.data.email}</p>
          </div>
          <hr />
          <span className={styles.booking}>
            <TbBrandBooking className={styles.icons} />
            <li onClick={handleBookingData}>My Booking</li>
          </span>
          <span className={styles.profiles}>
            <CgProfile className={styles.icons} />
            <li onClick={handleEditProfile}>My Profile</li>
          </span>
          <span className={styles.signout} onClick={handleLogout}>
            <LuLogOut className={styles.icons} />
            <li>Logout</li>
          </span>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
