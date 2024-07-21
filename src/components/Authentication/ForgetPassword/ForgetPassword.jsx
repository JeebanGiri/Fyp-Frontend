import styles from "./ForgetPassword.module.css";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const ForgetPassword = () => {
  const navigateTo = useNavigate();
  const [data, setData] = useState({
    email: "",
    code: "",
    new_password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleResetClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8848/auth/finalize-password-reset", data)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          navigateTo("/login");
        }, 4000);
      })
      .catch((error) => {
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        console.log(errorMsg);
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.verification}>
        <form className={styles.form} onSubmit={handleResetClick}>
          <div className={styles.title}>Reset your password</div>
          <p className={styles.message}>
            The verification code is already sent to your mailbox. please check
            it.
          </p>

          <div className={styles["input-group"]}>
            <label className={styles.label}>Email Address *</label>
            <input
              name="email"
              id="email"
              className={styles.input}
              onChange={handleInputChange}
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label className={styles.label}>Code *</label>
            <input
              name="code"
              id="code"
              className={styles.input}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter code"
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label className={styles.label}>New Password *</label>
            <input
              name="new_password"
              id="password"
              className={styles.input}
              onChange={handleInputChange}
              type="password"
              placeholder="Enter new Password"
              required
            />
          </div>
          <button className={styles.action}>Reset Password</button>
          <p style={{ cursor: "pointer", marginLeft: "5px", color: "blue" }}>
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
