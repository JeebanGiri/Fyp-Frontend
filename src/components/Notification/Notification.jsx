import { useQuery } from "react-query";
import styles from "./Notification.module.css";
import { IoNotifications } from "react-icons/io5";
import { getNotification } from "../../constants/Api";

const formattedDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
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
  return date.toLocaleString("en-US", options);
};

const Notification = () => {
  const token = localStorage.getItem("token");
  const { data: messageInfo } = useQuery("notification", () =>
    getNotification(token)
  );
  console.log(messageInfo, "message");
  const messages = messageInfo?.data.result;
  
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
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div className={styles.body} key={message.id}>
                <div className={styles.line}>
                </div>
                <div className={styles.messagecontent}>
                  <p>{message.title}</p>
                  <p>{message.body}</p>
                  <p>{formattedDateTime(message.created_at)}</p>
                </div>
                <hr />
              </div>

            ))
          ) : (
            <div className={styles.nomessage}>
              <p>No notifications available</p>
              <img
                src="https://thumbs.dreamstime.com/b/no-message-chat-icon-editable-line-vector-prohibition-symbol-round-bubble-cross-single-pictogram-176038671.jpg"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Notification;
