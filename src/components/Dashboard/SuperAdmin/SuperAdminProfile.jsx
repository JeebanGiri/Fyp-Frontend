import styles from "./SuperAdminProfile.module.css";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
import { userProfile } from "../../../constants/Api";
import { useQuery } from "react-query";

const SuperAdminProfile = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/list-property/login-hoteladmin");
    window.location.reload();
  };
  const { data } = useQuery("get-profile", () => userProfile(token));
  console.log(data, "datas");

  const goToProfiles = () => {
    navigateTo("/hoteladmin-dashboard/my-profiles");
  };

  const handleBookingData = (e) => {
    e.preventDefault();
    navigateTo("/my-reservation");
  };

  return (
    <>
      <div className={styles.profilebox}>
        {data ? (
          <div>
            <div className={styles.profileimage}>
              {data.data.avatar ? (
                <img
                  src={data.data.avatar}
                  alt="Profile Image"
                  height={100}
                  width={100}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <p>
                    {data.data.full_name.charAt(0).toUpperCase()}
                    {data.data.full_name.split(" ")[1]
                      ? data.data.full_name
                          .split(" ")[1]
                          .charAt(0)
                          .toUpperCase()
                      : null}
                  </p>
                </div>
              )}
              <p>{data?.data.full_name}</p>
            </div>
            <hr />
            <span className={styles.booking}>
              <TbBrandBooking className={styles.icons} />
              <li onClick={handleBookingData}>My Booking</li>
            </span>
            <span className={styles.profiles} onClick={goToProfiles}>
              <CgProfile className={styles.icons} />
              <li>My Profile</li>
            </span>

            <button className={styles.signout} onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SuperAdminProfile;
