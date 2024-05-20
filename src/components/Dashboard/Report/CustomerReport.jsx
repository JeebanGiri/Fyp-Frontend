import { formatDate } from "../../../utils/formatDate";
import styles from "./CustomerReport.module.css";
import { FaHotel } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const CustomerReport = () => {
  const currentDate = Date.now();
  const formattedDate = formatDate(currentDate);

  return (
    <>
      <div className={styles.reportContainer}>
        <div className={styles.reportpage}>
          <div className={styles.header}>
            <span>
              <h5>
                <span>
                  <FaHotel />
                </span>
                <span>Hotel Sagarmatha</span>
              </h5>
              <p>
                <span>
                  <CiLocationOn />
                </span>
                <span>Panchkapan, Lalitpur</span>
              </p>
            </span>
          </div>
          <div className={styles["report-titles"]}>
            <span>
              <p>Report Name</p>
              <p>Reserve By: Mr. Suraj Panta</p>
            </span>
            <span>
              <p>Invoice No: </p>
              <p>Date: {formattedDate}</p>
            </span>
          </div>
          <div className={styles["report-body"]}>
            <div className={styles.col}>
              <h6>Customer Name</h6>
              <p>Jeeban Giri</p>
            </div>
            <div className={styles.col}>
              <h6>Customer Contact</h6>
              <p>98r4378r634</p>
            </div>
            <div className={styles.col}>
              <h6>Room Quantity</h6>
              <p>2</p>
            </div>
            <div className={styles.col}>
              <h6>Room Rate</h6>
              <p>Rs. 4249</p>
            </div>
            <div className={styles.col}>
              <h6>Total Amount</h6>
              <p>8498</p>
              <p className={styles.gtotal}>Grand Total</p>
              <hr />
              <p>8498</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReport;
