import { useEffect, useState } from "react";
import styles from "./EditHotel.module.css";
import { DatePicker, TimePicker } from "antd";
import { getHotel, updateHotel } from "../../../../constants/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment/moment";
import { formatDate } from "../../../../utils/formatDate";
const { RangePicker } = TimePicker;

const textareaStyle = {
  width: "100%",
  height: "200px",
};

const EditHotel = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    hotel_name: "",
    address: "",
    phone_number: "",
    avatar: "",
    cover: "",
    documents: [],
    citizenship_no: "",
    citizenship_issued_date: null,
    citizenship_front: "",
    citizenship_back: "",
    checkin_checkout: {
      check_in_time: "",
      check_out_time: "",
    },
    account_number: "",
    account_name: "",
    bank_name: "",
    branch_name: "",
    description: "",
  });

  const { data: fetchHotelInfo } = useQuery("hotel-info", () =>
    getHotel(token)
  );
  const hotelInfo = fetchHotelInfo?.data;
  const hotelId = hotelInfo?.id;

  useEffect(() => {
    if (hotelInfo) {
      const {
        name,
        address,
        phone_number,
        avatar,
        cover,
        documents,
        citizenship_no,
        citizenship_issued_date,
        citizenship_front,
        citizenship_back,
        checkin_checkout: { check_in_time, check_out_time },
        account_number,
        account_name,
        bank_name,
        branch_name,
        description,
      } = hotelInfo;

      setFormData({
        hotel_name: name,
        address,
        phone_number,
        avatar,
        cover,
        documents,
        citizenship_no,
        citizenship_issued_date: citizenship_issued_date
          ? citizenship_issued_date
          : null,
        citizenship_front,
        citizenship_back,
        checkin_checkout: { check_in_time, check_out_time },
        account_number,
        account_name,
        bank_name,
        branch_name,
        description,
      });
    }
  }, [hotelInfo]);

  const handleChange = (event) => {
    const { name, files, value } = event.target;
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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    setFormData({ ...formData, citizenship_issued_date: date });
  };

  const handleCheckinCheckoutChange = (dates, dateString) => {
    const [check_in_time, check_out_time] = dateString;
    setFormData({
      ...formData,
      checkin_checkout: {
        check_in_time,
        check_out_time,
      },
    });
  };

  const handleUpdate = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (Array.isArray(value)) {
        // if (key === "documents") {
        //   value.forEach((file) => data.append(key, file));
        if (key === "documents") {
          value.forEach((file) => data.append(`${key}[]`, file)); // Append as an array
        } else {
          value.forEach((item, index) => data.append(`${key}[${index}]`, item));
        }
      } else if (typeof value === "object" && value !== null) {
        if (key === "checkin_checkout") {
          data.append(`${key}[check_in_time]`, value.check_in_time);
          data.append(`${key}[check_out_time]`, value.check_out_time);
        } else {
          Object.keys(value).forEach((subKey) => {
            data.append(`${key}[${subKey}]`, value[subKey]);
          });
        }
      } else {
        data.append(key, value);
      }
    });

    updateHotel(hotelId, data, token)
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          navigateTo("/hoteladmin-dashboard/view-hotel");
        }, 2000);
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
              <h5>Update Hotel</h5>
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
                    value={formData.hotel_name}
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
                    value={formData.address}
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
                    value={formData.phone_number}
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
                    value={formData.citizenship_no}
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
                    value={formData.citizenship_issued_date}
                    format={formatDate}
                    onChange={handleDatePickerChange}
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
                <div className={styles["input-container"]}>
                  <RangePicker
                    name="checkin_checkout"
                    value={
                      formData.citizenship_issued_date
                        ? formData.check_in_time
                        : formData.check_out_time
                    }
                    format="HH:mm A"
                    placeholder={["Check-In", "Check-Out"]}
                    onChange={handleCheckinCheckoutChange}
                    className={styles["input-field"]}
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
                    value={formData.account_number}
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
                    value={formData.bank_name}
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
                    value={formData.account_name}
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
                    value={formData.branch_name}
                    placeholder="Bank Branch"
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
                    value={formData.description}
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
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </form>
    </>
  );
};
export default EditHotel;
