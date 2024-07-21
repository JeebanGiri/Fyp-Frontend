import { useState } from "react";
import styles from "./ChangePassword.module.css";
import { IoIosLock } from "react-icons/io";
import { changePassword } from "../../constants/Api";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangePassword = () => {
  const [changePasswordUser, setChangePasswordUser] = useState({
    old_password: "",
    new_password: "",
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
  };
  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.changepassword}>
          <h5>Change your password</h5>
          <div className={styles.inputfields}>
            <span>
              <label htmlFor="password">
                Current Passowrd <span style={{ color: "red" }}>*</span>
                <div className={styles.lockIcon}>
                  <input
                    type="text"
                    id="password"
                    name="old_password"
                    className={styles.cpassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter Current Password"
                  />
                  <span className={styles.icons}>
                    <IoIosLock />
                  </span>
                </div>
              </label>
              <hr />
            </span>
            <span>
              <label htmlFor="password">
                New Password <span style={{ color: "red" }}>*</span>
                <div className={styles.lockIcon}>
                  <input
                    type="text"
                    id="new_password"
                    name="new_password"
                    onChange={handlePasswordChange}
                    placeholder="Enter new Password"
                  />
                  <span className={styles.icons}>
                    <IoIosLock />
                  </span>
                </div>
              </label>
              <hr />
            </span>
          </div>
          <span className={styles["psw-change"]}>
            <button>Change Password</button>
          </span>
        </div>
      </form>
    </>
  );
};
export default ChangePassword;
