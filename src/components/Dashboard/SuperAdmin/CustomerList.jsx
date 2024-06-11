import Dashboards from "./Dashboard";
import styles from "./CustomerList.module.css";

export default function CustomerList() {
  return (
    <>
      <div className={styles.customerlist}>
        <Dashboards />
      </div>
    </>
  );
}
