import { FaFacebookF } from "react-icons/fa";
import styles from "./Footer.module.css";
import { FiTwitter } from "react-icons/fi";
import { LiaGoogle } from "react-icons/lia";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles["footerpage"]}>
          <div className={styles["footer-top"]}>
            <span>
              <p>Help</p>
              <li>
                <a href="tel://980709974" id="phone">
                  +977-9807099754
                </a>
              </li>
              <li>
                <a href="mailto:help@hotelnew.com" id="email-footer">
                  help@hotelnew.com
                </a>
              </li>
            </span>
            <span>
              <p>About</p>
              <li>About us</li>
              <li>FAQ</li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li className={styles.condt}>Terms and condition</li>
            </span>
            <span>
              <p>Destination</p>
              <li>Countries/Territories</li>
              <li>Cities</li>
            </span>
            <span>
              <p>Partner with us</p>
              <li>
                <Link to="/list-property/register-hoteladmin">
                  Join us today
                </Link>
              </li>
            </span>
            <hr />
          </div>
          <div className={styles["below-footer"]}>
            <p>
              All material here in 2024 On Horizon Residence. All Rights
              Reserved. Horizon Residence is part of Booking Holdings Inc., the
              world leader in online reservation & related services.
            </p>
            <div className={styles.icons}>
              <span className={styles["footer-icon"]}>
                <FaFacebookF />
              </span>
              <span>
                <FiTwitter />
              </span>
              <span>
                <BsYoutube />
              </span>
              <span>
                <LiaGoogle />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
