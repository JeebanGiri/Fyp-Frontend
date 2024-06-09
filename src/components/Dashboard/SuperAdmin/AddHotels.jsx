import { useState } from "react";
import styles from "./AddHotels.module.css";
import { DatePicker } from "antd";
import { registerHotel } from "../../../constants/Api";
import { TimePicker } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const { RangePicker } = TimePicker;

const textareaStyle = {
  width: "100%",
  height: "150px",
};

const AddHotels = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    email: "",
    password: "",
    hotel_name: "",
    hotel_address: "",
    contact_number: "",
    avatar: "",
    cover: "",
    documents: [],
    citizenship_no: "",
    citizenship_issued_date: "",
    citizenship_front: "",
    citizenship_back: "",
    checkin_checkout: {
      check_in_time: "",
      check_out_time: "",
    },
    account_number: "",
    bank_name: "",
    account_name: "",
    branch_name: "",
    description: "",
  });
  console.log(formData);

  const handleChange = (event) => {
    const { name, files, value } = event.target;
    //For handling the multiple files send in document input
    if (files) {
      if (name === "documents") {
        const newDocuments = [...formData.documents];
        for (let i = 0; i < files.length; i++) {
          newDocuments.push(files[i]);
        }
        setFormData({
          ...formData,
          documents: newDocuments,
        });
      } else {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      }
    } else if (name === "phone_number" || name === "contact_number") {
      const formattedPhoneNumber = value.startsWith("+977-")
        ? value
        : `+977-${value}`;
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    // Update formData with the selected date
    setFormData({ ...formData, citizenship_issued_date: dateString });
    console.log(formData.citizenship_issued_date);
  };

  const handleCheckinCheckoutChange = (dates, dateString) => {
    setFormData({ ...formData, checkin_checkout: dateString });
    console.log(formData.checkin_checkout);
  };

  const validatePhoneNumbers = () => {
    const { phone_number, contact_number } = formData;
    if (phone_number.length > 15 || contact_number.length > 15) {
      toast.warn("Phone number is invalid");
      return false;
    }
    return true;
  };

  const handleUpload = () => {
    if (!validatePhoneNumbers()) {
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      // if (Array.isArray(value)) {
      //   value.forEach((file) => data.append(key, file));
      //   // Use the appropriate key format for array elements
      //   value.forEach((file, index) => data.append(`${key}[${index}]`, file));
      // } else {
      //   data.append(key, value);
      // }
      if (key === "documents") {
        value.forEach((file) => data.append("documents", file));
      } else if (key === "checkin_checkout") {
        data.append("check_in_time", formData.checkin_checkout.check_in_time);
        data.append("check_out_time", formData.checkin_checkout.check_out_time);
      } else {
        data.append(key, value);
      }
    });

    const token = localStorage.getItem("token");
    // Pass the FormData object here
    registerHotel(data, token)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          navigateTo("/hoteladmin-dashboard/view-hotel");
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
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={(e) => e.preventDefault()}
        encType="multipart/form-data"
        className={styles["hotel-listform"]}
      >
        <span className={styles["back-btn"]}>
          <button onClick={handleGoBack}>Back</button>
        </span>
        <div className={styles["form-box"]}>
          <div className={styles.top}>
            <span>
              <p>Hotel Guest Registration Form</p>
              <hr />
            </span>
          </div>
          <div className={styles["input-form"]}>
            <div className="ownerinfo">
              <span className={styles.ownerinfo}>
                <p>Hotel Owner Info</p>
                <hr />
              </span>
              <span>
                <div className={styles.label1}>
                  <div className={styles.inputs}>
                    <label
                      htmlFor="inputname"
                      className={styles["input-label"]}
                    >
                      Hotel Owner Name
                    </label>
                    <div className={styles["input-container"]}>
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Hotel Name"
                        className={styles["input-field"]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.inputs}>
                    <label
                      htmlFor="inputname"
                      className={styles["input-label"]}
                    >
                      Address
                    </label>
                    <div className={styles["input-container"]}>
                      <input
                        type="text"
                        name="address"
                        placeholder="Hotel Address"
                        className={styles["input-field"]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.inputs}>
                    <label
                      htmlFor="inputname"
                      className={styles["input-label"]}
                    >
                      Phone Number
                    </label>
                    <div className={styles["input-container"]}>
                      <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        className={styles["input-field"]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.inputs}>
                    <label
                      htmlFor="inputname"
                      className={styles["input-label"]}
                    >
                      Email
                    </label>
                    <div className={styles["input-container"]}>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        className={styles["input-field"]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.inputs}>
                    <label
                      htmlFor="inputname"
                      className={styles["input-label"]}
                    >
                      Password
                    </label>
                    <div className={styles["input-container"]}>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className={styles["input-field"]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <span className={styles.ownerinfo}>
              <p>Hotel Details Info</p>
              <hr />
            </span>
            <div className={styles.label1}>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Hotel Name
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="hotel_name"
                    placeholder="Hotel Name"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Hotel Address
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="hotel_address"
                    placeholder="Hotel Address"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Phone Number
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="contact_number"
                    placeholder="Contact Number"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.label2}>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Avatar
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    className={styles["input-field"]}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Cover Photo
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="file"
                    name="cover"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Documents
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="file"
                    name="documents"
                    className={styles["input-field"]}
                    onChange={handleChange}
                    multiple
                  />
                </div>
              </div>
            </div>
            <div className={styles.label3}>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Citizenship No.
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="citizenship_no"
                    placeholder="Citizen-ship Number"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  CitizenShip-Issue-Date
                </label>
                <div className={styles["input-container"]}>
                  <DatePicker
                    placeholder="select date"
                    name="citizenship_issued_date"
                    className={styles["input-field"]}
                    onChange={handleDatePickerChange}
                    needConfirm
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Citizenship-Front
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="file"
                    name="citizenship_front"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles["no-label"]}>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Citizenship-Back
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="file"
                    name="citizenship_back"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="inputs">
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Check-In Check-Out
                </label>
                <span className={styles.timepicker}>
                  <RangePicker
                    name="checkin_checkout"
                    format="h:mm A"
                    placeholder={["Check-In", "Check-Out"]}
                    onChange={handleCheckinCheckoutChange}
                    className={styles["input-field"]}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.article}>
            <p className={styles.text}>Hotel Owner Financial Details Form</p>
            <hr />
          </div>
          <div className={styles["second-input-form"]}>
            <div className={styles.label4}>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Account Number
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="account_number"
                    placeholder="Account Number"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Bank Name
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="bank_name"
                    placeholder="Bank Name"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Account Name
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="account_name"
                    placeholder="Account Name"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.label6}>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Bank Branch
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="branch_name"
                    placeholder="Bank Branch"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.textarea}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Description
                </label>
                <div className={styles["input-container"]}>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter your hotel description"
                    style={textareaStyle}
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <button onClick={handleUpload}>Add Details</button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddHotels;
