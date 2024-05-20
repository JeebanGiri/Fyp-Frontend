import styles from "./ChangePersonalDetails.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosLock } from "react-icons/io";
import { useEffect, useState } from "react";
import { updateProfile, userProfile } from "../../constants/Api";
import { useMutation, useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePersonaldetails = () => {
  const jwt = localStorage.getItem("token");

  const { data } = useQuery("get-profile", () => userProfile(jwt));
  console.log(data);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    changeProfileMutation.mutate(formData);
  };
  return (
    <>
      <ToastContainer />
      {data ? (
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
          <span className={styles["change-details"]}>
            <button onClick={handleSubmit}>Change Details</button>
          </span>
        </div>
      ) : null}
    </>
  );
};
export default ChangePersonaldetails;
