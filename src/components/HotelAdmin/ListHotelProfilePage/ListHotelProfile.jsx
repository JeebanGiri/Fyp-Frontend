import HomelImg from "../../../assets/home.png";
import HotelImg from "../../../assets/hotel.png";
import AppratmentImg from "../../../assets/appartment.png";
import styles from "./ListHotelProfile.module.css";

const ListHotelProfile = () => {
  return (
    <>
      <div className={styles["property-listing"]}>
        <div className={styles.header}>
          <h2>
            List your property on Horizen Residence and start welcoming guests{" "}
            <br />
            in no time!
          </h2>
          <p>
            To get started, choose the type of property you want to list on
            Booking.com
          </p>
        </div>
        <div className={styles["property-box"]}>
          <div className={styles.box1}>
            <div className={styles.image}>
              <img src={HotelImg} alt="Hotel Icon" />
            </div>
            <div className={styles.titles}>
              <h4>Hotel</h4>
            </div>
            <div className={styles.article}>
              <p>
                Properties like hotels, B&Bs, guest houses, hostels,
                aparthotels, etc.
              </p>
            </div>
            <div className={styles.button}>
              <button>List your property</button>
            </div>
          </div>
          <div className={styles.box2}>
            <div className={styles.image}>
              <img src={HomelImg} alt="Hotel Icon" />
            </div>
            <div className={styles.titles}>
              <h4>Homes</h4>
            </div>
            <div className={styles.article}>
              <p>Properties like apartments, holiday homes, villas, etc.</p>
            </div>
            <div className={styles.button}>
              <button>List your property</button>
            </div>
          </div>
          <div className={styles.box3}>
            <div className={styles.image}>
              <img src={AppratmentImg} alt="Hotel Icon" />
            </div>
            <div className={styles.titles}>
              <h4>Apartment</h4>
            </div>
            <div className={styles.article}>
              <p>
                Furnished and self-catering accommodation, where guests rent the
                entire place.
              </p>
            </div>
            <div className={styles.button}>
              <button>List your property</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListHotelProfile;
