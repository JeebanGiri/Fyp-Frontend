import { useQuery } from "react-query";
import styles from "./Notification.module.css";
import { IoNotifications } from "react-icons/io5";
import { getNotification } from "../../constants/Api";

const date = new Date();

// Format options for displaying the date and time
const options = {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

// Get the formatted date and time string
const formattedDateTime = date.toLocaleString("en-US", options);
  
const Notification = () => {
  const token = localStorage.getItem("token");
  const { data } = useQuery("notification", () => getNotification(token));

  const messages = data?.data;
  console.log(messages);

  return (
    <>
      <div className={styles.notification}>
        <div className={styles["notification-container"]}>
          <div className={styles.header}>
            <p className={styles.titles}>Notification</p>
            <p>
              <IoNotifications />
            </p>
          </div>
          <div className={styles.line}>
            <hr />
          </div>
          <div className={styles.messagecontent}>
            <p>A New Notification form Rajesh stay free to contact with him!</p>
            <p>{formattedDateTime}</p>
          </div>
          <div className={styles.line}>
            <hr />
          </div>
          <div className={styles.messagecontent}>
            <p>A New Notification form Anup stay free to contact with him!</p>
            <p>{formattedDateTime}</p>
          </div>
          <div className={styles.line}>
            <hr />
          </div>
          <div className={styles.messagecontent}>
            <p>A New Notification form Dinup stay free to contact with him!</p>
            <p>{formattedDateTime}</p>
          </div>
          <div className={styles.line}>
            <hr />
          </div>
          <div className={styles.messagecontent}>
            <p>A New Notification form Ranjiv stay free to contact with him!</p>
            <p>{formattedDateTime}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notification;
