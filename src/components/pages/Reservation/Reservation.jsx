/* eslint-disable no-unused-vars */
import styles from "./Reservation.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import Select from "react-select";
import { TbSmokingNo } from "react-icons/tb";
import { TbSmoking } from "react-icons/tb";
import { Rate } from "antd";
import { IoIosBed } from "react-icons/io";
import { format } from "date-fns";
import { LuBedDouble } from "react-icons/lu";
import { useQuery } from "react-query";
import { Modal } from "antd";
import { getHotelInfo, reserveHotel } from "../../../constants/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../../constants/constant";
import RegisterPopUp from "./RegisterPopUp/RegisterPopUp";
import LoginPopUp from "./LoginPopUp/LoginPopUp";

var desc = ["terrible", "bad", "normal", "good", "wonderful"];

const options = [
  { value: "nepal", label: "Nepal" },
  { value: "india", label: "India" },
  { value: "pakistan", label: "Pakistan" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "france", label: "France" },
  { value: "brasil", label: "Brasil" },
  { value: "afganistan", label: "Afganistan" },
  { value: "bhutan", label: "Bhutan" },
  { value: "germany", label: "Germay" },
];

const Reservation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBed, setIsBed] = useState("");
  const navigateTo = useNavigate();
  const [previousPage, setPreviousPage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get("hotelId");
  const roomId = searchParams.get("roomId");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const total_Amount = searchParams.get("total_Amount");
  const room_Type = searchParams.get("room_Type");
  const room_Quantity = searchParams.get("room_Quantity");

  const { data: hotelInfo } = useQuery("get-hotel", () =>
    getHotelInfo(hotelId)
  );

  console.log(hotelInfo, "hotel Data in object");

  const hotelData = hotelInfo?.data;
  console.log(hotelData, "hotel Data in array");

  useEffect(() => {
    // Store the URL of the previous page before navigating to the email verification page
    localStorage.setItem("bookingPage", window.location.pathname);
  }, []);

  useEffect(() => {
    const storedPreviousPage = localStorage.getItem("previousPage");
    setPreviousPage(storedPreviousPage);
  }, []);

  const [bookData, setBookData] = useState({
    full_name: "",
    email: "",
    confirm_email: "",
    phone_number: "",
    country: "",
  });

  const handleBookChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setBookData({ ...bookData, [name]: value });
  };

  const toogleLogin = () => {
    navigateTo("/login");
  };
  const toogleregister = () => {
    navigateTo("/register");
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  // For Select component, directly set the value without using event.target
  const handleSelectCountry = (selectedOption) => {
    setBookData({ ...bookData, country: selectedOption.value });
  };

  const handleSmoking = (event) => {
    setIsSmoking(event.target.value);
  };

  const handleBed = (event) => {
    setIsBed(event.target.value);
  };

  useEffect(() => {
    const tokens = getToken();
    if (tokens) {
      setIsLoggedIn(true);
    }
  }, []);

  // Convert string dates to Date objects
  const checkInDateTime = new Date(checkInDate);
  const checkOutDateTime = new Date(checkOutDate);

  // Calculate the difference in milliseconds
  const timeDifference = checkOutDateTime.getTime() - checkInDateTime.getTime();

  // Convert milliseconds to days
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const noOfDays = Math.ceil(timeDifference / oneDayInMilliseconds);

  const formatDate = (date) => {
    // Format the date using date-fns
    const formattedDate = format(date, "EEE dd MMM yyyy");
    // Return the formatted date
    return formattedDate;
  };
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const checkIn_Date = formatDate(checkIn);
  const checkOut_Date = formatDate(checkOut);

  const handleBokingSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    reserveHotel(
      hotelId,
      roomId,
      room_Type,
      room_Quantity,
      total_Amount,
      checkIn_Date,
      checkOut_Date,
      bookData,
      token
    )
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
        console.log(message);
        console.log(response.data);
        const redirectUrl = response.data.redirect;
        console.log(redirectUrl, "redirect");
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      })
      .catch((error) => {
        console.log(error.response);
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg === "Unauthorized") {
          toast.warn("Please login first");
        } else if (
          errorMsg === "Please login first to find best accommodation?"
        ) {
          toast.error(errorMsg);
          setIsLoginOpen(true);
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterOk = () => {
    setIsRegisterOpen(false);
  };

  const handleRegisterCancel = () => {
    setIsRegisterOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles["booking-page"]}>
        <div className={styles["process-details"]}>
          <div>
            {hotelData
              ? hotelData.map((hotels) => (
                  <div className={styles["selection-details"]} key={hotels.id}>
                    <span className={styles.hotelinfo}>
                      <span className={styles.hotelimage}>
                        <img
                          src={
                            `${BACKEND_URL}/static/hotel_admin/register-hotel` +
                            hotels.avatar
                          }
                          alt="Images"
                        />
                      </span>
                      <span className={styles.hoteldetails}>
                        <p>Free Wi-fi</p>
                        <p>{hotels.name}</p>
                        <p className={styles.rating}>
                          <Rate
                            tooltips={desc}
                            disabled
                            defaultValue={hotels.rating_value}
                          />
                        </p>
                        <p>{hotelData.address}</p>
                        <p>
                          <span className={styles.locicon}>
                            <CiLocationOn />
                          </span>
                          Excellent Location
                        </p>
                      </span>
                    </span>
                    <div className={styles.bookingdetails}>
                      <h6>Your booking details</h6>
                      <span className={styles.bookinfo}>
                        <span className={styles.checkin}>
                          <p>Check-in</p>
                          <b>{checkIn_Date}</b>
                          <p>15:00 – 00:00</p>
                        </span>
                        <span className={styles.checkout}>
                          <p>Check-Out</p>
                          <b>{checkOut_Date}</b>
                          <p>15:00 – 00:00</p>
                        </span>
                      </span>
                      <span className={styles.staytime}>
                        <p>Total length of stay:</p>
                        <p>{noOfDays} night</p>
                      </span>
                    </div>
                    <div className={styles.pricesummary}>
                      <h6>The Price Summary</h6>
                      <div className={styles.pricebox}>
                        <span>
                          <h4>Total</h4>
                        </span>
                        <span className={styles.pricetext}>
                          <h4>NPR {total_Amount}</h4>
                          <p>Includes taxes and charges In property currency</p>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className={styles["input-details"]}>
            {!isLoggedIn && (
              <div className={styles.makelogin}>
                <span className={styles.personicon}>
                  <IoPersonOutline />
                </span>
                <span className={styles.loginsignin}>
                  <span className={styles.login} onClick={showModal}>
                    Sign in <span></span>
                  </span>
                  to book with your saved details or {""}
                  <span className={styles.register} onClick={showRegisterModal}>
                    register {""}
                  </span>
                  to manage your bookings on the go!
                </span>
              </div>
            )}
            <Modal
              title="Login from here"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <LoginPopUp />
            </Modal>
            <Modal
              title="Register from here"
              open={isRegisterOpen}
              onOk={handleRegisterOk}
              onCancel={handleRegisterCancel}
            >
              <RegisterPopUp />
            </Modal>
            <form action="bookhotel" onSubmit={handleBokingSubmit}>
              <div className={styles["booking-details"]}>
                <h5>Let's us know who you are</h5>
                <div className={styles.inputs}>
                  <label htmlFor="inputname" className={styles["input-label"]}>
                    Full Name <span className={styles.labelstar}>*</span>
                  </label>
                  <span className={styles["input-container"]}>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full Name"
                      onChange={handleBookChange}
                      className={styles["input-field"]}
                    />
                  </span>
                  <label htmlFor="inputname" className={styles["input-label"]}>
                    Email <span className={styles.labelstar}>*</span>
                  </label>
                  <span className={styles["input-container"]}>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={handleBookChange}
                      className={styles["input-field"]}
                    />
                  </span>
                  <label htmlFor="inputname" className={styles["input-label"]}>
                    Retype email <span className={styles.labelstar}>*</span>
                  </label>
                  <span className={styles["input-container"]}>
                    <input
                      type="text"
                      name="confirm_email"
                      placeholder="Confirm email"
                      onChange={handleBookChange}
                      className={styles["input-field"]}
                    />
                  </span>
                  <p className={styles.sendnotifi}>
                    If you enter your email address and do not complete your
                    reservation, we may send you reminders to help you resume
                    your booking.
                  </p>
                  <div className={styles["footer-section"]}>
                    <span className="contact">
                      <label
                        htmlFor="inputname"
                        className={styles["input-label"]}
                      >
                        Phone Number
                        <span style={{ fontWeight: "300", fontSize: "12px" }}>
                          (Optional)
                        </span>
                        <span className={styles.labelstar}>*</span>
                      </label>
                      <div className={styles["input-containers"]}>
                        <input
                          type="text"
                          name="phone_number"
                          placeholder="Phone Number"
                          onChange={handleBookChange}
                          className={styles["input-fields"]}
                        />
                      </div>
                    </span>
                    <span className="country">
                      <label
                        htmlFor="inputname"
                        className={styles["input-label"]}
                      >
                        Country/region of residence
                        <span className={styles.labelstar}>*</span>
                      </label>
                      <div className={styles["country-containers"]}>
                        <Select
                          options={options}
                          name="country"
                          onChange={handleSelectCountry}
                          className={styles["country-fields"]}
                        />
                      </div>
                    </span>
                  </div>
                </div>
                <hr />
                <div className={styles.aminities}>
                  <h6>Let us know what you need</h6>
                  <p className={styles.infos}>
                    Requests are subject to availability. We'll send yours right
                    after you book.
                  </p>
                  <div className={styles.preference}>
                    <p>Do you have a smoking preference?</p>
                    <div className={styles.smoking}>
                      <div className={styles.radio}>
                        <span>
                          <input
                            type="radio"
                            value="non-smoking"
                            onChange={handleSmoking}
                            checked={isSmoking === "non-smoking"}
                          />
                        </span>
                        <span>
                          <TbSmokingNo />
                        </span>
                        <label>
                          <span>Non Smoking</span>
                        </label>
                      </div>
                      <div className={styles.radio}>
                        <span>
                          <input
                            type="radio"
                            value="smoking"
                            onChange={handleSmoking}
                            checked={isSmoking === "smoking"}
                          />
                        </span>
                        <span>
                          <TbSmoking />
                        </span>
                        <label>
                          <span>Non Smoking</span>
                        </label>
                      </div>
                    </div>
                    <p>What bed configuration do you prefer?</p>
                    <div className={styles.beds}>
                      <div className={styles.radio}>
                        <span>
                          <input
                            type="radio"
                            value="large-bed"
                            onChange={handleBed}
                            checked={isBed === "large-bed"}
                          />
                        </span>
                        <span>
                          <IoIosBed />
                        </span>
                        <label>
                          <span>I'd like a large bed</span>
                        </label>
                      </div>
                      <div className={styles.radio}>
                        <span>
                          <input
                            type="radio"
                            value="twin-bed"
                            onChange={handleBed}
                            checked={isBed === "twin-bed"}
                          />
                        </span>
                        <span>
                          <LuBedDouble />
                        </span>
                        <label>
                          <span>I'd like a twin bed</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {!isLoggedIn && isLoginOpen && <SignIn toggle={toggleLoginOpen} />} */}
              <div className={styles.bookbtn}>
                <button>Next Step</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reservation;
