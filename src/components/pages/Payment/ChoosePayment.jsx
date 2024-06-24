import styles from "./ChoosePayment.module.css";
export default function ChoosePayment({ handleBookingSubmit }) {
  const handlePayment = (gateway) => {
    console.log(gateway, "gateway of payment");
    // e.preventDefault();
    handleBookingSubmit(
      {
        preventDefault: () => {
          // Define preventDefault if it's expected in handleBookingSubmit
        },
      },
      gateway
    );
  };
  return (
    <div>
      <div className={styles.choosebox}>
        <h5>Choose Payment Options</h5>
        <div className={styles.options}>
          <div className={styles["khalti-btn"]}>
            <button onClick={() => handlePayment("KHALTI")}>
              Pay with Khalti
            </button>
          </div>
          <div className={styles["stripe-btn"]}>
            <button onClick={() => handlePayment("STRIPE")}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
