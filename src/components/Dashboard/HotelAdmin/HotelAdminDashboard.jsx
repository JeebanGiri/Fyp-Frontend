import styles from "./HotelAdminDashboard.module.css";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import Select from "react-select";
import { useQuery } from "react-query";
import {
  getAllCustomer,
  getTotalBookingHotelAdmin,
  getTotalIncomeHotelAdmin,
  getTotalRoomHotelAdmin,
} from "../../../constants/Api";

const HotelAdminDashboard = () => {
  const options = [
    { value: "Last 30  days", label: "Last 30 Days" },
    { value: "Last 6 Months", label: "Last 6 Months" },
    { value: "Last 1 Year", label: "Last 1 Year" },
  ];

  // useEffect(() => {
  //   const handleMenuClick = () => {
  //     const navcontainer = document.querySelector(".navcontainer");
  //     if (navcontainer) {
  //       navcontainer.classList.toggle("navclose");
  //     }
  //   };

  //   const menuicn = document.getElementById("menuicn");
  //   if (menuicn) {
  //     menuicn.addEventListener("click", handleMenuClick);

  //     return () => {
  //       menuicn.removeEventListener("click", handleMenuClick);
  //     };
  //   }
  // }, []);

  const token = localStorage.getItem("token");
  const { data: totalRooms } = useQuery("get-rooms", () =>
    getTotalRoomHotelAdmin(token)
  );

  const { data: totalBooking } = useQuery("get-booking", () =>
    getTotalBookingHotelAdmin(token)
  );

  const { data: totalIncome } = useQuery("get-totalincome", () =>
    getTotalIncomeHotelAdmin(token)
  );

  const { data: customerInfo } = useQuery("get-customer", () =>
    getAllCustomer(token)
  );

  // const customer = customerInfo?.data

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
              {totalBooking
                ? totalBooking &&
                  totalBooking.data && (
                    <h2 className={styles["topic-heading"]}>
                      {totalBooking.data}
                    </h2>
                  )
                : null}
            </span>
            <span className={styles.image}>
              <TbBrandBooking />
            </span>
          </div>

          <div className={`${styles.box} ${styles.box2}`}>
            <span className={styles.text}>
              <h2 className={styles.topic}>Rooms Available</h2>
              {totalRooms
                ? totalRooms.data && (
                    <h2 className={styles["topic-heading"]}>
                      {totalRooms.data}
                    </h2>
                  )
                : null}
            </span>
            <span className={styles.image}>
              <MdOutlineBedroomParent />
            </span>
          </div>

          <div className={`${styles.box} ${styles.box3}`}>
            <span className={styles.text}>
              <h2 className={styles.topic}>Total Income</h2>
              {totalIncome
                ? totalIncome.data && (
                    <h2 className={styles["topic-heading"]}>
                      {totalIncome.data}
                    </h2>
                  )
                : null}
            </span>
            <span className={styles.image}>
              <LiaMoneyCheckAltSolid />
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
              <h4 className={styles["t-op"]}>Address</h4>
              <h4 className={styles["t-op"]}>Phone Number</h4>
              <h4 className={styles["t-op"]}>Check-in-Date</h4>
              <h4 className={styles["t-op"]}>Check-out-Date</h4>
              <h4 className={styles["t-op"]}>Total Amount</h4>
            </div>
            {customerInfo?.data[0]
              ? customerInfo?.data[0].map((customer) => (
                  <div className={styles.items} key={customer.id}>
                    <div className={styles.item1}>
                      <h4 className={styles["t-op-nextlvl"]}>
                        {customer.full_name}
                      </h4>
                      <h4 className={styles["t-op-nextlvl"]}>
                        {customer.country}
                      </h4>
                      <h4 className={styles["t-op-nextlvl"]}>
                        {customer.phone_number}
                      </h4>
                      <h4 className={styles["t-op-nextlvl"]}>
                        {customer.check_In_Date}
                      </h4>
                      <h4 className={styles["t-op-nextlvl"]}>
                        {customer.check_Out_Date}
                      </h4>
                      <h4 className={styles["t-op-nextlvl"]}>
                        {customer.total_amount}
                      </h4>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default HotelAdminDashboard;
