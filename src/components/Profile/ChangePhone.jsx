import styles from "./ChangePhone.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { updateProfile, userProfile } from "../../constants/Api";
import { useMutation, useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePhone = () => {
  const jwt = localStorage.getItem("token");
  const { data } = useQuery("get-profile", () => userProfile(jwt));
  console.log(data);

  const [formData, setFormData] = useState({
    old_phone_number: "",
    new_phone_number: "",
  });

  console.log(formData.old_phone_number, "odl");
  console.log(formData.new_phone_number, "new");

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

  const changePhoneMutation = useMutation((data) => {
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
    changePhoneMutation.mutate(formData);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className={styles.detailsinfo}>
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
          <span className={styles["psw-change"]}>
            <button>Change Password</button>
          </span>
        </div>
      </form>
    </>
  );
};
export default ChangePhone;
