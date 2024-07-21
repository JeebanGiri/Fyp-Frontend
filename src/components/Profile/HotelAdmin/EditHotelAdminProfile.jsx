import styles from "./EditHotelAdminProfile.module.css";
import ThreeDot from "../../../assets/Dashboard/dot.png";
import ArrowImg from "../../../assets/Dashboard/arrow.png";
import Profileimg from "../../../assets/Dashboard/personalinf.png";
import Bell from "../../../assets/Dashboard/bell.png";
import { IoIosArrowForward } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

import {
  changePassword,
  updateProfile,
  userProfile,
} from "../../../constants/Api";
import { useMutation, useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseOutsideClick } from "../../../utils/useOutSideClick";
import { useNavigate } from "react-router-dom";

const EditHotelAdminProfile = () => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const navigateTo = useNavigate();
  const jwt = localStorage.getItem("token");

  const { data } = useQuery("get-profile", () => userProfile(jwt));
  console.log(data);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    old_phone_number: "",
    new_phone_number: "",
    address: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    if (data) {
      const { full_name, email, phone_number, address } = data.data;
      setFormData({ full_name, email, phone_number, address });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [changePasswordUser, setChangePasswordUser] = useState({
    old_password: "",
    new_password: "",
  });

  const changeProfileMutation = useMutation((data) => {
    const token = localStorage.getItem("token");
    updateProfile(data, token)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
      })
      .catch((error) => {
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  });

  const changePMutation = useMutation((data) => {
    const token = localStorage.getItem("token");
    changePassword(data, token)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
      })
      .catch((error) => {
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  });

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setChangePasswordUser({ ...changePasswordUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePMutation.mutate(changePasswordUser);
    changeProfileMutation.mutate(formData);
  };

  const outerRef = useRef();
  UseOutsideClick(() => setIsUpdateProfileOpen(false), outerRef);

  const toogleUpdateDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdateProfileOpen(!isUpdateProfileOpen);
  };

  const goToPassword = () => {
    navigateTo("/hoteladmin-dashboard/my-profiles/change-password");
  };
  return (
    <>
      <ToastContainer />
      {data ? (
        <form onSubmit={handleSubmit}>
          <div className={styles["profile-box"]}>
            <div className={styles.box1}>
              <div className={styles.profileinfo}>
                <div className={styles.profileimage}>
                  {data.data.avatar ? (
                    <img
                      src={data.data.avatar}
                      alt="Profile Image"
                      height={100}
                      width={100}
                    />
                  ) : (
                    <div className={styles.pbox}>
                      <p>
                        {data.data.full_name.charAt(0).toUpperCase()}
                        {data.data.full_name.split(" ")[1]
                          ? data.data.full_name
                              .split(" ")[1]
                              .charAt(0)
                              .toUpperCase()
                          : ""}
                      </p>
                    </div>
                  )}
                  <span className={styles.names}>
                    <p>{data?.data.full_name}</p>
                    <p>{data?.data.email}</p>
                  </span>
                </div>
                <span
                  className={styles.actionsbtn}
                  onClick={toogleUpdateDropdown}
                >
                  <img
                    src={ThreeDot}
                    alt="Action Button"
                    className={styles.actions}
                    // onClick={openUpdateBox}
                  />
                </span>
              </div>
              {isUpdateProfileOpen && (
                <div className={styles["openablebox"]} ref={outerRef}>
                  <div className={styles["photo-update"]}>
                    <span>
                      <FaCamera />
                    </span>
                    <span className={styles.contents}>Change Photo</span>
                  </div>
                  <div className={styles["profile-update"]}>
                    <span>
                      <RiEdit2Fill />
                    </span>
                    <span className={styles.contents}>Update Profile</span>
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
                    <span>Personal Information</span>
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
                    <span>Change Password</span>
                  </span>
                  <span className={styles.secondinfos}>
                    <span className={styles.detailsarrow}>
                      <img src={ArrowImg} alt="Arrow" />
                    </span>
                  </span>
                </li>
              </div>
            </div>
            <div className={styles.detailsinfo}>
              <div className={styles.personaldetails}>
                <div className={styles["top-content"]}>
                  <h4>Personal Information</h4>
                  <p>
                    Basic info, like your name and address, that you use on Nio
                    Platform.
                  </p>
                </div>
                <div className={styles.notation}>
                  <p>Basics</p>
                </div>
                <div className={styles.inputfields}>
                  <span>
                    <label htmlFor="fullname">
                      Full Name <span style={{ color: "red" }}>*</span>
                      <div className={styles.arrowIcon}>
                        <input
                          type="text"
                          id="fullname"
                          name="full_name"
                          placeholder="John Doe"
                          value={formData.full_name}
                          onChange={handleInputChange}
                        />
                        <span className={styles.icons}>
                          <IoIosArrowForward />
                        </span>
                      </div>
                    </label>
                    <hr />
                  </span>
                  <span>
                    <label htmlFor="email">
                      Email <span style={{ color: "red" }}>*</span>
                      <div className={styles.lockIcon}>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="jeeban@gmail.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <span className={styles.icons}>
                          <IoIosLock />
                        </span>
                      </div>
                    </label>
                    <hr />
                  </span>

                  <span>
                    <label htmlFor="address">
                      Address <span style={{ color: "red" }}>*</span>
                      <div className={styles.arrowIcon}>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Biratchowk, Morang"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        <span className={styles.icons}>
                          <IoIosArrowForward />
                        </span>
                      </div>
                    </label>
                    <hr />
                  </span>
                </div>
              </div>
              <div className={styles.changepassword}>
                <h5>Change your contact details</h5>
                <div className={styles.inputfields}>
                  <span>
                    <label htmlFor="phone">
                      Current Phone Number
                      <span style={{ color: "red" }}>*</span>
                      <div className={styles.arrowIcon}>
                        <input
                          type="text"
                          id="phone_number"
                          name="old_phone_number"
                          value={formData.phone_number}
                          placeholder="+9779807099754"
                          onChange={handleInputChange}
                        />
                        <span className={styles.icons}>
                          <IoIosArrowForward />
                        </span>
                      </div>
                    </label>
                    <hr />
                  </span>
                  <span>
                    <label htmlFor="password">
                      New Phone Number <span style={{ color: "red" }}>*</span>
                      <div className={styles.arrowIcon}>
                        <input
                          type="text"
                          id="new_phonenumber"
                          name="new_phone_number"
                          onChange={handleInputChange}
                          placeholder="Enter new Phone Number"
                        />
                        <span className={styles.icons}>
                          <IoIosArrowForward />
                        </span>
                      </div>
                    </label>
                    <hr />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span className={styles["psw-change"]}>
            <button>Submit</button>
          </span>
        </form>
      ) : null}
    </>
  );
};
export default EditHotelAdminProfile;
