/* eslint-disable react/no-unescaped-entities */
import style from "./LoginHotelAdmin.module.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginHotelAdmin = () => {
  const navigateTo = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("Email", data.email);

    axios
      .post("http://localhost:8848/auth/login", data)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);

        // setTimeout(() => {
        //   navigateTo("/hoteladmin-dashboard");
        //   window.location.reload();
        // }, 200);
        // const access_token = response.data.access_token;
        // localStorage.setItem("token", access_token);

        const Jwt_token = response.data.access_token;
        const role = response.data.role;

        localStorage.setItem("token", Jwt_token);
        localStorage.setItem("role", role);

        if (Jwt_token && role === "SUPER_ADMIN") {
          toast.success(message);
          navigateTo("/superadmin-dashboard");
        } else if (Jwt_token && role === "HOTEL_ADMIN") {
          console.log(role);
          navigateTo("/hoteladmin-dashboard");
        } else {
          setTimeout(() => {
            navigateTo("/");
            // window.location.reload();
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error.response);
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
          if (errorMsg === "Please Verify Your Email First") {
            setTimeout(() => {
              navigateTo("/email-verification");
            }, 2000);
          }
        }
      });
  };

  const handleForgetPassword = () => {
    try {
      const email = localStorage.getItem("Email");

      console.log("Email data", email);
      console.log(email);

      axios
        .post("http://localhost:8848/auth/initiate-password-reset", {
          email: email,
        })
        .then((response) => {
          const message = response.data.message;
          toast.success(message);
          console.log(message);
          setTimeout(() => {
            navigateTo("/forget-password");
          }, 2000);
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
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className={style.loginform}>
        <div className={style["login-page"]}>
          <div className={style["login-container"]}>
            <div className={style.header}>
              <h4>Welcome Back</h4>
              <p>Enter your credentials to access your account</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className={style["form-group"]}>
                <div className={style.inputitem}>
                  <div className={style["input-email"]}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={style["input-password"]}>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={style.action}>
                  <p>
                    Forget your password?
                    <span
                      onClick={handleForgetPassword}
                      style={{
                        cursor: "pointer",
                        marginLeft: "5px",
                        color: "blue",
                      }}
                    >
                      Reset Password
                    </span>
                  </p>
                </div>
                <div className={style.btn}>
                  <button type="submit">Sign In</button>
                </div>
                <div className={style.footer}>
                  <p>
                    Don't have an account?
                    <NavLink
                      to="/list-property/register-hoteladmin"
                      className={style["register-link"]}
                    >
                      {" "}
                      Click here to register.
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginHotelAdmin;
