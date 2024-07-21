import styles from "./Rating.module.css";
import { useState } from "react";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
import { rateHotel } from "../../../constants/Api";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rating = (props) => {
  const token = localStorage.getItem("token");
  const hotelId = props.hotelId;

  const [formData, setFormData] = useState({
    rate: 0,
    hotel_id: hotelId,
  });

  const handleRateChange = (value) => {
    setFormData({ ...formData, rating_value: value });
  };

  const mutation = useMutation((formData) => {
    rateHotel(formData, token)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
      })
      .catch((error) => {
        console.log(error);
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles["rating-box"]}>
        <div className={styles.header}>
          <h3>Please Rate Your Exprience</h3>
          <p>to help us serve you better</p>
        </div>
        <span className={styles["rate-icons"]}>
          <Rate
            tooltips={desc}
            name="rating_value"
            onChange={handleRateChange}
            className={styles["rate-icons"]}
          />
        </span>
        <span className={styles.btns}>
          <button onClick={handleSubmit}>Submit</button>
        </span>
      </div>
    </>
  );
};
export default Rating;
