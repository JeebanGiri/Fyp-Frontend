import { useState } from "react";
import axios from "axios";
import styles from "./EmailVerification.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const EmailVerification = () => {
  const navigateTo = useNavigate();

  //------ Initialize in use state hook -----------
  const [data, setData] = useState({
    code: "",
    email: "",
  });

  // ----------Extract the value----------
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // --------- Sending the data to backend server -------------
  const handleVerifySubmit = (e) => {
    try {
      e.preventDefault();
      console.log("email", data.email, "code", data.code);
      axios
        .post("http://localhost:8848/auth/email-verification", data)
        .then((response) => {
          const message = response.data.message;
          toast.success(message);
          setTimeout(() => {
            // Redirect based on the user's status and previous page
            navigateTo("/login");
          }, 1000);
        })
        .catch((error) => {
          const errorMsg =
            error.response.data.message || error.response.data.error.message;
          if (Array.isArray(errorMsg)) {
            errorMsg.forEach((err) => toast.error(err));
          } else if (errorMsg) {
            toast.error(errorMsg);

            if (errorMsg === "User Already Verified.") {
              setTimeout(() => {
                navigateTo("/login");
              }, 2000);
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleResendClick = () => {
    try {
      const email = localStorage.getItem("Email");

      console.log("Email data", email);

      console.log(email);
      axios
        .post("http://localhost:8848/auth/resend-email-verification", {
          email: email,
        })
        .then((response) => {
          console.log(response.data);
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

            if (errorMsg === "User Already Verified.") {
              setTimeout(() => {
                navigateTo("/login");
              }, 2000);
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.verification}>
        <form className={styles.form} onSubmit={handleVerifySubmit}>
          <div className={styles.title}>Email</div>
          <div className={styles.title}>Verification Code</div>
          <p className={styles.message}>
            We have sent a verification to your email
          </p>
          <div className={styles.inputs}>
            <label htmlFor="code">
              <TextField
                id="standard-basic"
                label="Enter 5-digit code"
                variant="standard"
                name="code"
                onChange={handleInputChange}
                className={styles.textField}
                InputLabelProps={{
                  style: { textAlign: "center" },
                }}
                required
              />
            </label>
          </div>
          <div className={styles["input-email"]}>
            <label htmlFor="email">
              <TextField
                id="standard-basic"
                label="Enter your email"
                variant="standard"
                name="email"
                onChange={handleInputChange}
                className={styles.textField}
                required
              />
            </label>
          </div>
          <div className={styles.resend}>
            <p>
              Didn't get a code?
              <span
                onClick={handleResendClick}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              >
                Resend
              </span>
            </p>
          </div>
          <button className={styles.action}>Verify Me</button>
        </form>
      </div>
    </>
  );
};

export default EmailVerification;
