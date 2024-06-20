import styles from "./ChoosePayment.module.css";
export default function ChoosePayment({ handleBookingSubmit }) {
  return (
    <div>
      <div className={styles.choosebox}>
        <h5>Choose Payment Options</h5>
        <div className={styles.options}>
          <div className={styles["khalti-btn"]}>
            <button onClick={handleBookingSubmit}>Pay with Khalti</button>
          </div>
          <div className={styles["stripe-btn"]}>
            <button onClick={handleBookingSubmit}>pay with Stripe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
