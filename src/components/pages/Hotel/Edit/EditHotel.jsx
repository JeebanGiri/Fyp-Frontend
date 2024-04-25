import { TextField } from "@mui/material";
import styles from "./EditHotel.module.css";

const EditHotel = () => {
  const handleInputChange = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form action="">
        <div className={styles.registerhotel}>
          <div className={styles.header}>
            <h2>Update Hotel Info</h2>
          </div>
          <div className={styles["input-items"]}>
            <div className={styles.panel1}>
              <div className={styles.inputlabel}>
                <label htmlFor="name">
                  <p>Hotel Name *</p>
                  <TextField
                    type="text"
                    sx={{ width: 300, ml: 1 }}
                    id="name"
                    name="name"
                    label="Enter Hotel Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
              <div className={styles.inputlabel}>
                <label htmlFor="address">
                  <p>Hotel Address *</p>
                  <TextField
                    type="text"
                    sx={{ width: 300, ml: 1 }}
                    id="address"
                    name="address"
                    label="Enter Hotel Address"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
              <div className={styles.inputlabel}>
                <label htmlFor="latitude">
                  <p>Latitude *</p>
                  <TextField
                    type="text"
                    sx={{ width: 300, ml: 1 }}
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
              <div className={styles.inputlabel}>
                <label htmlFor="longitude">
                  <p> Longitude *</p>
                  <TextField
                    type="text"
                    sx={{ width: 300, ml: 1 }}
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
            </div>
            <div className={styles.panel2}>
              <div className={styles.inputlabel}>
                <label htmlFor="phone">
                  <p>Mobile Number *</p>
                  <TextField
                    type="text"
                    sx={{ width: 300, ml: 1 }}
                    id="phone"
                    name="phone"
                    label="phone"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
              <div className={styles.inputlabel}>
                <label htmlFor="avatar">
                  <p>Avatar *</p>
                  <TextField
                    type="file"
                    sx={{ width: 300, ml: 1 }}
                    id="avatar"
                    name="avatar"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
              <div className={styles.inputlabel}>
                <label htmlFor="coverphoto">
                  <p>Cover *</p>
                  <TextField
                    type="file"
                    sx={{ width: 300, ml: 1 }}
                    id="coverphoto"
                    name="cover"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
              <div className={styles.inputlabel}>
                <label htmlFor="document">
                  <p>Document *</p>
                  <TextField
                    type="file"
                    sx={{ width: 300, ml: 1 }}
                    id="document"
                    name="document"
                    variant="outlined"
                    onChange={handleInputChange}
                    style={{ height: "50px", width: "380px" }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={styles["add-btn"]}>
            <label htmlFor="addhotel">
              <button type="submit" name="registerbutton" id="addhotel">
                <p className={styles["edit-btn"]}>S u b m i t</p>
              </button>
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditHotel;
