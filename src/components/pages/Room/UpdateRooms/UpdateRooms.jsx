/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "react-query";
import styles from "./UpdateRooms.module.css";
import Select from "react-select";
import { getRoomById, updateRooms } from "../../../../constants/Api";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRooms = (props) => {
  const options = [
    { value: "Standard Room", label: "Standard" },
    { value: "Deluxe Room", label: "Deluxe" },
    { value: "Double Room", label: "Double" },
    { value: "Triple Room", label: "Triple" },
    { value: "Deluxe Double Room", label: "Deluxe Double Room" },
  ];
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    room_name: "",
    room_number: "",
    room_rate: "",
    room_type: "",
    room_capacity: "",
    images: [],
  });

  const hotel_id = props.hotelId;
  const room_id = props.roomId;
  // Fetch the room data based on roomId
  const { data: roomInfo } = useQuery(["room", room_id], () =>
    getRoomById(room_id, token)
  );

  useEffect(() => {
    if (roomInfo) {
      const {
        room_name,
        room_number,
        room_rate,
        room_type,
        room_capacity,
        images,
      } = roomInfo.data;
      setFormData({
        room_name,
        room_number,
        room_type,
        room_rate,
        room_capacity,
        images,
      });
    }
  }, [roomInfo]);

  const mutation = useMutation((formData) => {
    updateRooms(room_id, formData, token)
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
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
            </div>
            <div className={styles.label1}>
              <span className={styles.hotelname}>
                <label htmlFor="name">Room Name</label>
                <input
                  type="text"
                  placeholder="Room Name"
                  name="room_name"
                  value={formData.room_name}
                  onChange={handleChange}
                />
              </span>
              <span className={styles.roomnumber}>
                <label htmlFor="number">Room Number</label>
                <input
                  type="number"
                  name="room_number"
                  placeholder="Room number"
                  id="number"
                  value={formData.room_number}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className={styles.label2}>
              <span className={styles["input-rate"]}>
                <label htmlFor="rate">Room Rate</label>
                <span className={styles["label2-input"]}>
                  <input
                    type="number"
                    name="room_rate"
                    id="rate"
                    value={formData.room_rate}
                    placeholder="Room Rate"
                    onChange={handleChange}
                  />
                </span>
              </span>
              <span className={styles.selection}>
                <label htmlFor="type">Room Type</label>
                <Select
                  options={options}
                  className={styles.select}
                  name="room_type"
                  placeholder="Select Rooms"
                  value={options.find(
                    (option) => option.value === formData.room_type
                  )}
                  onChange={handleSelectChange}
                />
              </span>
            </div>
            <div className={styles.label3}>
              <span className="input-capacity">
                <label htmlFor="capicity">Room Capacity</label>
                <input
                  type="number"
                  name="room_capacity"
                  placeholder="Room Capacity"
                  id="capacity"
                  value={formData.room_capacity}
                  onChange={handleChange}
                />
              </span>
              <span className={styles["input-files"]}>
                <label htmlFor="img" className={styles["file-label"]}>
                  Room Avatar
                </label>
                <input
                  type="file"
                  id="img"
                  name="images"
                  onChange={handleChange}
                  multiple
                  // value={formData.images}
                  className={styles["file-input"]}
                />
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
export default UpdateRooms;
