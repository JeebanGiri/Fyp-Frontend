import { useState } from "react";
import styles from "./RegisterHotelAdmin.module.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterHotelAdmin = () => {
  const navigateTo = useNavigate();

  const [data, setData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem("Email", data.email);

    axios
      .post("http://localhost:8848/hoteladmin/register-admin", data)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          navigateTo("/email-verification");
        }, 2000);
      })
      .catch((error) => {
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        toast.error(errorMsg);
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
      <div className={styles.registerform}>
        <div className={styles.registercontainer}>
          <div className={styles.header}>
            <h4>Register</h4>
            <p>Enter your information to create an account</p>
          </div>
          <form onSubmit={handleRegister}>
            <div className={styles.inputitem}>
              <div className={styles["input-label1"]}>
                <div className={styles["input-name"]}>
                  <label htmlFor="fullName">Full name</label>
                  <br />
                  <input
                    type="text"
                    id="fullName"
                    name="full_name"
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className={styles["input-phone"]}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phone_number"
                    placeholder="+977-9807099754"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={styles["input-label2"]}>
                <div className={styles["input-email"]}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles["input-password"]}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.btn}>
                  <button type="submit">Create your partner account</button>
                </div>
              </div>

              <div className={styles.footer}>
                <p>
                  Already have an account?{" "}
                  <NavLink to="/list-property/login-hoteladmin">Log in</NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterHotelAdmin;
