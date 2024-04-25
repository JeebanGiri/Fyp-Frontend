import styles from "./Rating.module.css";
import { useState } from "react";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
import { RxCross2 } from "react-icons/rx";


const Rating = () => {
  const [rate, setRate] = useState(0);
  return (
    <>
      <div className={styles["rating-box"]}>
        <div className={styles.crossicons}>
          <RxCross2 />
        </div>
        <div className={styles.header}>
          <h3>Please Rate Your Exprience</h3>
          <p>to help us serve you better</p>
        </div>
        <span className={styles["rate-icons"]}>
          <Rate
            tooltips={desc}
            onChange={setRate}
            value={rate}
            className={styles["rate-icons"]}
          />
        </span>
      </div>
    </>
  );
};
export default Rating;
