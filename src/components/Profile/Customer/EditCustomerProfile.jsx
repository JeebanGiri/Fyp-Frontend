import styles from "./EditCustomerProfile.module.css";
import ThreeDot from "../../../assets/Dashboard/dot.png";
import ArrowImg from "../../../assets/Dashboard/arrow.png";
import Profileimg from "../../../assets/Dashboard/personalinf.png";
import { FaCamera, FaExchangeAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { updateProfilePhoto, userProfile } from "../../../constants/Api";
import { useMutation, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../constants/constant";
import { UseOutsideClick } from "../../../utils/useOutSideClick";

const EditCustomerProfile = () => {
  const [showProfileBox, setShowProfileBox] = useState(false);
  const profileBoxRef = useRef();

  UseOutsideClick(() => setShowProfileBox(false), profileBoxRef);

  const navigateTo = useNavigate();
  const jwt = localStorage.getItem("token");

  const handleProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowProfileBox(!showProfileBox);
  };

  const [profileData, setProfileData] = useState({
    avatar: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const { data: userInfo } = useQuery("get-profile", () => userProfile(jwt));

  const updateUserProfile = useMutation((data) => {
    updateProfilePhoto(data, jwt)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
        setImagePreviewUrl("");
      })
      .catch((error) => {
        const errorMsg =
          (error.response && error.response.data.message) ||
          error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  });

  useEffect(() => {
    if (userInfo) {
      setProfileData({
        avatar: userInfo.data.avatar || null,
      });
    }
  }, [userInfo]);

  const gotToInfo = () => {
    navigateTo("/edit-profile");
  };

  const goToPassword = () => {
    navigateTo("/edit-profile/change-password");
  };

  const goToPhone = () => {
    navigateTo("/edit-profile/change-phone");
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  const handleChangeProfile = (event, field) => {
    if (event.target.type === "file") {
      const file = event.target.files && event.target.files[0];
      setProfileData({ ...profileData, [field]: file });
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setProfileData({ ...profileData, [field]: event.target.value });
    }
  };

  const handleProfileUpdate = () => {
    // Create a FormData object to send the profile data including the file
    const formData = new FormData();
    formData.append("avatar", profileData.avatar);
    updateUserProfile.mutate(formData);
  };

  return (
    <>
      <ToastContainer />
      {userInfo ? (
        <div className={styles["profile-box"]}>
          <div className={styles.box1}>
            <div className={styles.profileinfo}>
              <div className={styles.profileimage}>
                {userInfo.data.avatar ? (
                  <img
                    className={styles.avatar}
                    src={`${BACKEND_URL}/static/user/avatars/${userInfo?.data.avatar}`}
                    alt="Profile"
                  />
                ) : (
                  <div className={styles.pbox}>
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
                <span className={styles.names}>
                  <p>{userInfo.data.full_name}</p>
                  <p>{userInfo.data.email}</p>
                </span>
              </div>
              <span className={styles.actionsbtn} onClick={handleProfileClick}>
                <img
                  src={ThreeDot}
                  alt="Action Button"
                  className={styles.actions}
                  ref={profileBoxRef}
                />
              </span>
            </div>
            {showProfileBox && (
              // <div className={styles["openablebox"]} ref={profileBoxRef}>
              <div
                className={`${styles["openablebox"]} ${
                  imagePreviewUrl ? styles.expanded : ""
                }`}
                ref={profileBoxRef}
              >
                <div
                  className={styles["photo-update"]}
                  onClick={triggerFileInput}
                >
                  <div className={styles.changeimg}>
                    <span>
                      <FaCamera />
                    </span>
                    <span className={styles.contents}>Change Photo</span>
                    <input
                      id="file-input"
                      type="file"
                      name="avatar"
                      // accept="image/*"
                      onChange={(e) => handleChangeProfile(e, "avatar")}
                      style={{ display: "none" }}
                    />
                  </div>
                  {imagePreviewUrl ? (
                    <div className={styles.imagePreview}>
                      <img
                        src={imagePreviewUrl}
                        alt="Selected Image Preview"
                        className={styles.previewImage}
                      />
                    </div>
                  ) : null}
                </div>
                <div className={styles["profile-update"]}>
                  <button
                    className={styles.contents}
                    onClick={handleProfileUpdate}
                  >
                    Update avatar
                  </button>
                </div>
              </div>
            )}
            <hr />
            <div className={styles.dropdownitem}>
              <li className={styles.info}>
                <span className={styles.firstinfos}>
                  <span>
                    <img src={Profileimg} alt="Personal Information" />
                  </span>
                  <span className={styles.slidebar} onClick={gotToInfo}>
                    Personal Information
                  </span>
                </span>
                <span className={styles.secondinfos}>
                  <span className={styles.detailsarrow}>
                    <img src={ArrowImg} alt="Arrow" />
                  </span>
                </span>
              </li>
              <li className={styles.info}>
                <span className={styles.firstinfos} onClick={goToPassword}>
                  <span>
                    <FaExchangeAlt style={{ color: "skyblue" }} />
                  </span>
                  <span className={styles.slidebar}>Change Password</span>
                </span>
                <span className={styles.secondinfos}>
                  <span className={styles.detailsarrow}>
                    <img src={ArrowImg} alt="Arrow" />
                  </span>
                </span>
              </li>
              <li className={styles.info}>
                <span className={styles.firstinfos} onClick={goToPhone}>
                  <span>
                    <MdOutlinePhoneInTalk style={{ color: "skyblue" }} />
                  </span>
                  <span className={styles.slidebar}>
                    Change Contact Details
                  </span>
                </span>
                <span className={styles.secondinfos}>
                  <span className={styles.detailsarrow}>
                    <img src={ArrowImg} alt="Arrow" />
                  </span>
                </span>
              </li>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default EditCustomerProfile;
