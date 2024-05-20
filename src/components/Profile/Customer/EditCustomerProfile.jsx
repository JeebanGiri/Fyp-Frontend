import styles from "./EditCustomerProfile.module.css";
import ThreeDot from "../../../assets/Dashboard/dot.png";
import ArrowImg from "../../../assets/Dashboard/arrow.png";
import Profileimg from "../../../assets/Dashboard/personalinf.png";
import { FaCamera, FaExchangeAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { useRef, useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { userProfile } from "../../../constants/Api";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseOutsideClick } from "../../../utils/useOutSideClick";
import { useNavigate } from "react-router-dom";

const EditCustomerProfile = () => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const navigateTo = useNavigate();
  const jwt = localStorage.getItem("token");

  const { data } = useQuery("get-profile", () => userProfile(jwt));
  console.log(data);

  // const [formData, setFormData] = useState({
  //   full_name: "",
  //   email: "",
  //   old_phone_number: "",
  //   new_phone_number: "",
  //   address: "",
  //   old_password: "",
  //   new_password: "",
  // });
  // console.log(formData.old_phone_number, "odl");
  // console.log(formData.new_phone_number, "new");

  // useEffect(() => {
  //   if (data) {
  //     const { full_name, email, phone_number, address } = data.data;
  //     setFormData({ full_name, email, phone_number, address });
  //   }
  // }, [data]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const [changePasswordUser, setChangePasswordUser] = useState({
  //   old_password: "",
  //   new_password: "",
  // });

  // const changeProfileMutation = useMutation((data) => {
  //   const token = localStorage.getItem("token");
  //   updateProfile(data, token)
  //     .then((response) => {
  //       const message = response.data.message;
  //       toast.success(message);
  //     })
  //     .catch((error) => {
  //       const errorMsg =
  //         error.response.data.message || error.response.data.error.message;
  //       if (Array.isArray(errorMsg)) {
  //         errorMsg.forEach((err) => toast.error(err));
  //       } else if (errorMsg) {
  //         toast.error(errorMsg);
  //       }
  //     });
  // });

  // const changePMutation = useMutation((data) => {
  //   const token = localStorage.getItem("token");
  //   changePassword(data, token)
  //     .then((response) => {
  //       const message = response.data.message;
  //       toast.success(message);
  //     })
  //     .catch((error) => {
  //       const errorMsg =
  //         error.response.data.message || error.response.data.error.message;
  //       if (Array.isArray(errorMsg)) {
  //         errorMsg.forEach((err) => toast.error(err));
  //       } else if (errorMsg) {
  //         toast.error(errorMsg);
  //       }
  //     });
  // });

  // const handlePasswordChange = (event) => {
  //   const { name, value } = event.target;
  //   setChangePasswordUser({ ...changePasswordUser, [name]: value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   changePMutation.mutate(changePasswordUser);
  //   changeProfileMutation.mutate(formData);
  // };

  const outerRef = useRef();
  UseOutsideClick(() => setIsUpdateProfileOpen(false), outerRef);

  const toogleUpdateDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdateProfileOpen(!isUpdateProfileOpen);
  };

  const gotToInfo = () => {
    navigateTo("/edit-profile");
  };

  const goToPassword = () => {
    navigateTo("/edit-profile/change-password");
  };
  
  const goToPhone = () => {
    navigateTo("/edit-profile/change-phone");
  };

  return (
    <>
      <ToastContainer />
      {data ? (
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
