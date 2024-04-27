import ErrorPage from "../assets/PageNotFound/pagenotfound.png";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className={styles.pagenotfound}>
        <div className={styles.container}>
          <div className={styles.contnet}>
            <p>
              Oops! Maybe you got lost. The page you were looking for doesn't
              exist.
            </p>
          </div>
          <div className={styles.safebutton}>
            <button className={styles.button1} onClick={handleGoBack}>
              Take me to safe zone
            </button>
          </div>
        </div>
        <div className={styles["image-container"]}>
          <img src={ErrorPage} alt="Not Found" />
        </div>
      </div>
    </>
  );
};
export default PageNotFound;
