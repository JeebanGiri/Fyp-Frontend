import { useEffect } from "react";
import styles from "./HotelAdminDashboard.module.css";
import Select from "react-select";
import BookingImg from "../../../assets/Dashboard/booking.png";
import { useQuery } from "react-query";
import {
  getAllCustomer,
  getTotalBooking,
  getTotalIncome,
  getTotalRooms,
} from "../../../constants/Api";

const HotelAdminDashboard = () => {
  const options = [
    { value: "Last 30  days", label: "Last 30 Days" },
    { value: "Last 6 Months", label: "Last 6 Months" },
    { value: "Last 1 Year", label: "Last 1 Year" },
  ];

  useEffect(() => {
    const handleMenuClick = () => {
      const navcontainer = document.querySelector(".navcontainer");
      if (navcontainer) {
        navcontainer.classList.toggle("navclose");
      }
    };

    const menuicn = document.getElementById("menuicn");
    if (menuicn) {
      menuicn.addEventListener("click", handleMenuClick);

      return () => {
        menuicn.removeEventListener("click", handleMenuClick);
      };
    }
  }, []);

  const token = localStorage.getItem("token");
  const { data: totalRooms } = useQuery("get-rooms", () =>
    getTotalRooms(token)
  );

  console.log(totalRooms, "rooms");
  const { data: totalBooking } = useQuery("get-booking", () =>
    getTotalBooking(token)
  );
  console.log(totalBooking);

  const { data: totalIncome } = useQuery("get-totalincome", () =>
    getTotalIncome(token)
  );
  console.log(totalIncome);

  const { data: customerInfo } = useQuery("get-customer", () =>
    getAllCustomer(token)
  );
  console.log(customerInfo, "Customer");
  return (
    <>
      <div className={styles.main}>
        <div className={styles["title-content"]}>
          <span className={styles.welcome}>
            <h4>Dashboard Overview</h4>
          </span>
          <div className={styles.filter}>
            <span className={styles.selection}>
              <Select options={options} className={styles.select} />
            </span>
            <span className={styles["report-btn"]}>
              <button>Reports</button>
            </span>
          </div>
        </div>
        <div className={styles["box-container"]}>
          <div className={`${styles.box} ${styles.box1}`}>
            <span className={styles.text}>
              <h2 className={styles.topic}>Total Booking</h2>
              <h2 className={styles["topic-heading"]}>320</h2>
            </span>
            <span className={styles.image}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/458/613/non_2x/booking-ticket-order-solid-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg"
                alt="Boking"
              />
            </span>
          </div>
          <div className={`${styles.box} ${styles.box2}`}>
            <span className={styles.text}>
              <h2 className={styles.topic}>Rooms Available</h2>
              <h2 className={styles["topic-heading"]}>300</h2>
            </span>
            <span className={styles.image}>
              <img
                src="https://th.bing.com/th/id/OIP.1NAv34oSsIjDJHy2GK80MgHaHa?rs=1&pid=ImgDetMain"
                alt="Room"
              />
            </span>
          </div>
          <div className={`${styles.box} ${styles.box3}`}>
            <span className={styles.text}>
              <h2 className={styles.topic}>Rating</h2>
              <h2 className={styles["topic-heading"]}>150</h2>
            </span>
            <span className={styles.image}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3915/3915794.png"
                alt="likes"
              />
            </span>
          </div>
        </div>
        <div className={styles["report-container"]}>
          <div className={styles["report-header"]}>
            <h3 className={styles["recent-Articles"]}>Recent Activities</h3>
            <button className={styles.view}>View All</button>
          </div>
          <div className={styles["report-body"]}>
            <div className={styles["report-topic-heading"]}>
              <h4 className={styles["t-op"]}>Customer Name</h4>
              <h4 className={styles["t-op01"]}>Address</h4>
              <h4 className={styles["t-op"]}>Check-in-Date</h4>
              <h4 className={styles["t-op"]}>Check-Out-Date</h4>
            </div>
            <div className={styles.items}>
              <div className={styles.item1}>
                <h4 className={styles["t-op-nextlvl"]}>Jeeban</h4>
                <h4 className={styles["t-op-nextlvl"]}>Kathmandu</h4>
                <h4 className={styles["t-op-nextlvl"]}>22-Feb 2020</h4>
                <h4
                  className={`${styles["t-op-nextlvl"]} ${styles["label-tag"]}`}
                >
                  23 Feb 2020
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HotelAdminDashboard;
