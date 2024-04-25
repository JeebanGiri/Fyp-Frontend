import { useState } from "react";
import styles from "./EditHotel.module.css";
import { DatePicker } from "antd";
import Hotels from "../../../../assets/Hotel/addhotel.png";
import { TimePicker } from "antd";
import { createHotel } from "../../../../constants/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { RangePicker } = TimePicker;

const textareaStyle = {
  width: "100%",
  height: "200px",
};

const EditHotel = () => {
  const [formData, setFormData] = useState({
    hotel_name: "",
    address: "",
    phone_number: "",
    avatar: "",
    cover: "",
    latitude: "",
    longitude: "",
    opening_hours: {
      open_time: "",
      close_time: "",
    },
    documents: [],
    citizenship_no: "",
    citizenship_issued_date: "",
    citizenship_front: "",
    citizenship_back: "",
    account_number: "",
    bank_name: "",
    branch_name: "",
    descriptin: "description",
  });

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
      } else if (name === "opening_hours") {
        // Handle opening_hours separately since it's not a file input
        // Assuming value is an array [openTime, closeTime]
        const [openTime, closeTime] = value;
        const openingHours = {
          open_time: openTime.format("hh:mm A"),
          close_time: closeTime.format("hh:mm A"),
        };
        setFormData({
          ...formData,
          opening_hours: openingHours,
        });
      } else {
        // For other inputs, handle a single file
        setFormData({
          ...formData,
          [name]: files[0],
        });
      }
      console.log(files, "File selected");
    } else {
      const { value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
        opening_hours: value,
      });
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    // Update formData with the selected date
    setFormData({ ...formData, citizenship_issued_date: dateString });
    console.log(formData.citizenship_issued_date);
  };

  const handleTimePickerChange = (value, dateString) => {
    // Format the dateString into an object with open_time and close_time properties
    const [openTime, closeTime] = dateString;
    const openingHoursData = {
      open_time: openTime,
      close_time: closeTime,
    };
    // Update the formData with the formatted opening_hours data
    setFormData({
      ...formData,
      opening_hours: openingHoursData,
    });
    console.log(formData.opening_hours, "Time");
    console.log(openingHoursData);
  };

  const handleUpload = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (Array.isArray(value)) {
        value.forEach((file) => data.append(key, file));
      } else {
        data.append(key, value);
      }
    });
    const token = localStorage.getItem("token");

    createHotel(data, token) // Pass the FormData object here
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        toast.success(message);
      })
      .catch((error) => {
        console.log(error.response);
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
              <h2>Edit your hotel </h2>
            </span>
            <span className={styles.hotelimg}>
              <img src={Hotels} alt="Hotel Icon" />
            </span>
          </div>
          <div className={styles["input-form"]}>
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
                    name="address"
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
                    name="phone_number"
                    placeholder="Phone Number"
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
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Hotel-Opening Time
                </label>
                <div className={styles["input-container"]}>
                  <RangePicker
                    use12Hours
                    format="h:mm a"
                    className={styles["input-field"]}
                    placeholder={["Open Time", "Close Time"]}
                    name="opening_hours"
                    onChange={handleTimePickerChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.article}>
            <hr className={styles.left} />
            <p className={styles.text}>
              Also you can update your hotel location and financial details.
            </p>
            <hr className={styles.right} />
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

            <div className={styles.label5}>
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
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Latitude
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="inputname" className={styles["input-label"]}>
                  Longitude
                </label>
                <div className={styles["input-container"]}>
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    className={styles["input-field"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="label6">
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
export default EditHotel;
