import styles from "./Profile.module.css";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { useQuery } from "react-query";
import { userProfile } from "../../constants/Api";
import { useNavigate } from "react-router-dom";

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

  const { data } = useQuery("get-profile", () => userProfile(token));
  console.log(data, "datas");

  return (
    <>
      {data ? (
        <div className={styles.profilebox}>
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
                    ? data.data.full_name.split(" ")[1].charAt(0).toUpperCase()
                    : ""}
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
          <span className={styles.profiles}>
            <CgProfile className={styles.icons} />
            <li onClick={handleEditProfile}>My Profile</li>
          </span>
          <button className={styles.signout} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
