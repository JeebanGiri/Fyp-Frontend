/* eslint-disable react/prop-types */
import { useMutation } from "react-query";
import styles from "./AddRoomPopup.module.css";
import Select from "react-select";
import { createRoom } from "../../../../constants/Api";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRoomsPopup = (props) => {
  const handleClose = () => {
    props.toggle();
  };

  const options = [
    { value: "Standard Room", label: "Standard" },
    { value: "Deluxe Room", label: "Deluxe" },
    { value: "Double Room", label: "Double" },
    { value: "Triple Room", label: "Triple" },
    { value: "Deluxe Double Room", label: "Deluxe Double Room" },
  ];

  const [formData, setFormData] = useState({
    room_name: "",
    room_number: "",
    room_rate: "",
    room_type: "",
    room_capacity: "",
    images: [],
  });

  const hotel_id = props.hotelId;

  const mutation = useMutation((data) => {
    const token = localStorage.getItem("token");
    createRoom(data, hotel_id, token)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          handleClose();
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response);
        const errorMsg =
          error.response.data.message || error.response.data.error.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((err) => toast.error(err));
        } else if (errorMsg) {
          toast.error(errorMsg);
        }
      });
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      if (name === "images") {
        const newImage = [...formData.images];
        for (let i = 0; i < files.length; i++) {
          newImage.push(files[i]);
        }
        setFormData({ ...formData, images: newImage });
        console.log(newImage, "File selected");
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSelectChange = (selectedOption) => {
    // For Select component, directly set the value without using event.target
    setFormData({ ...formData, room_type: selectedOption.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      console.log(`Key: ${key}, Value: ${value}`);
      if (Array.isArray(value)) {
        value.forEach((file) => data.append(key, file));
      } else {
        data.append(key, value);
      }
    });
    mutation.mutate(data);
  };

  return (
    <>
      <div className="toast-container">
        <ToastContainer />
      </div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className={styles.roominfo}>
          <div className={styles["input-items"]}>
            <div className={styles.header}>
              <span>Room Information</span>
              <span onClick={handleClose} className={styles.cross}>
                <RxCrossCircled className={styles.fir} />
              </span>
            </div>
            <div className={styles.label1}>
              <span className={styles.hotelname}>
                <label htmlFor="name">
                  <input
                    type="text"
                    placeholder="Room Name"
                    name="room_name"
                    onChange={handleChange}
                  />
                </label>
              </span>
              <span className={styles.roomnumber}>
                <label htmlFor="number">
                  <input
                    type="text"
                    name="room_number"
                    placeholder="Room number"
                    id="number"
                    onChange={handleChange}
                  />
                </label>
              </span>
            </div>
            <div className={styles.label2}>
              <span className={styles["input-rate"]}>
                <label htmlFor="rate">
                  <span className={styles["label2-input"]}>
                    <input
                      type="text"
                      name="room_rate"
                      id="rate"
                      placeholder="Room Rate"
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </span>
              <span className={styles.selection}>
                <label htmlFor="type">
                  <Select
                    options={options}
                    className={styles.select}
                    name="room_type"
                    placeholder="Select Rooms"
                    onChange={handleSelectChange}
                  />
                </label>
              </span>
            </div>
            <div className={styles.label3}>
              <span className="input-capacity">
                <label htmlFor="capicity">
                  <input
                    type="number"
                    name="room_capacity"
                    placeholder="Room Capacity"
                    id="capacity"
                    onChange={handleChange}
                  />
                </label>
              </span>
              <span className={styles["input-files"]}>
                <label htmlFor="img" className={styles["file-label"]}>
                  <input
                    type="file"
                    id="img"
                    name="images"
                    onChange={handleChange}
                    multiple
                    className={styles["file-input"]}
                  />
                </label>
              </span>
            </div>
            <span className={styles["add-roombtn"]}>
              <button type="submit">Submit</button>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddRoomsPopup;
