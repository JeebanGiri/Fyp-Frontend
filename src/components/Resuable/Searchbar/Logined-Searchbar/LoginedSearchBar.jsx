import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./LoginedSearchbar.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { DatePicker, Form, Space } from "antd";
import Select from "react-select";
const { RangePicker } = DatePicker;
import { BsCalendar2Date } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { RiSubtractLine } from "react-icons/ri";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const customStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    width: "280px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: () => ({ display: "none" }),
};

const options = [
  { value: "biratchowk", label: "Biratchowk" },
  { value: "itahari", label: "Itahari" },
  { value: "dharan", label: "Dharan" },
  { value: "biratnagar", label: "Biratnagar" },
  { value: "pokhara", label: "Pokhara" },
  { value: "kathmandu", label: "Kathmandu" },
  { value: "damak", label: "Damak" },
  { value: "mustang", label: "Mustand" },
  { value: "manang", label: "Manang" },
  { value: "patan", label: "Patan" },
  { value: "Basantapur", label: "Basantapur" },
  { value: "dhankuta", label: "Dhankuta" },
  {
    value: "Sundarharaincha-12, Morang Nepal",
    label: "Sundarharaincha-12, Morang Nepal",
  },
];

const LoginedSearchbar = ({
  address: initialAddress,
  guests: initialGuests,
  rooms: initialRooms,
  checkIn: initialCheckIn,
  checkOut: initialCheckOut,
  setSearchParam,
}) => {
  console.log(initialCheckIn, initialCheckOut, "CheckIN and Out");

  const navigateTo = useNavigate();
  const [checkInDate, setCheckInDate] = useState(
    initialCheckIn ? new Date(initialCheckIn) : new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialCheckOut ? new Date(initialCheckOut) : new Date()
  );
  const [guests, setGuests] = useState(initialGuests ? initialGuests : 1);
  const [rooms, setRooms] = useState(initialRooms ? initialRooms : 1);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [address, setAddress] = useState(initialAddress || "");

  const [form] = Form.useForm();
  const dateFormat = "MM-DD-YYYY";

  const handleGuestIncrement = () => {
    setGuests(guests + 1);
  };

  const handleGuestDecrement = () => {
    if (guests > 1) {
      setGuests((prevGuests) => prevGuests - 1);
    }
  };

  const handleRoomIncrement = () => {
    setRooms(rooms + 1);
  };

  const handleRoomDecrement = () => {
    if (rooms > 1) {
      setRooms((prevRooms) => prevRooms - 1);
    }
  };

  const toggleGuestDropdown = (event) => {
    event.preventDefault();
    setIsGuestDropdownOpen(!isGuestDropdownOpen);
  };

  const handleDropdownClose = (event) => {
    event.preventDefault();
    setIsGuestDropdownOpen(false);
  };

  const handleSelectChange = (selectedOption) => {
    // For Select component, directly set the value without using event.target
    setAddress(selectedOption.value);
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [checkInDate, checkOutDate] = dates;
      const formattedCheckInDate = format(
        new Date(checkInDate.$d),
        "dd MMM yyyy"
      );
      // const formattedCheckInDate = new Date(checkInDate);
      const formattedCheckOutDate = format(
        new Date(checkOutDate.$d),
        "dd MMM yyyy"
      );
      // const formattedCheckOutDate = new Date(checkOutDate);
      setCheckInDate(formattedCheckInDate);
      setCheckOutDate(formattedCheckOutDate);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParam("rooms", rooms);
    setSearchParam("rooms", address);
    setSearchParam("guests", guests);
    setSearchParam("checkInDate", checkInDate);
    setSearchParam("checkOutDate", checkOutDate);

    navigateTo(
      `/hotel-landing?address=${address}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}&rooms=${rooms}`
    );
  };

  return (
    <>
      <Form form={form}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div className={styles["place-label"]}>
              <span className={styles.icon}>
                <IoBedOutline />
              </span>
              <div className={styles["places-label"]}>
                <label htmlFor="destination">
                  <Select
                    options={options}
                    name="address"
                    id="destination"
                    placeholder="Enter a destination or property"
                    className={styles["inputs-text"]}
                    onChange={handleSelectChange}
                    defaultInputValue={address}
                    styles={customStyles}
                  />
                </label>
              </div>
            </div>
            <div className={styles["date-label"]}>
              <span className={styles.icon}>
                <BsCalendar2Date />
              </span>
              <span className={styles.datepicker}>
                {/* <RangePicker
                  placeholder={["Check-In Date", "Check-Out Date"]}
                  name="check-in"
                /> */}
                <Space direction="vertical" size={12}>
                  <Form.Item name="dates" noStyle>
                    <RangePicker
                      placeholder={["Check-In Date", "Check-Out Date"]}
                      onChange={handleDateChange}
                      defaultValue={[dayjs(checkInDate), dayjs(checkOutDate)]}
                      format={dateFormat}
                      style={{ border: "none", focus: "none" }}
                    />
                  </Form.Item>
                </Space>
              </span>
            </div>

            <div className={styles.guest}>
              <div className={styles["guest-field"]}>
                <button
                  className={styles["guest-container"]}
                  onClick={toggleGuestDropdown}
                >
                  <span className={styles["span-container"]}>
                    <span className={styles.class1}>
                      <GoPeople />
                    </span>
                    <span className={styles.spaninput}>
                      {guests === 1 ? "1 Adult" : `${guests} Adults`} .
                      {rooms === 1 ? "1 Room" : `${rooms} Rooms`}
                    </span>
                  </span>
                  <span className={styles.selectoption}>
                    <MdKeyboardArrowDown />
                  </span>
                </button>
              </div>
              {isGuestDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles["dropdown-container"]}>
                    <div className={styles.items}>
                      <div className={styles.item1}>
                        <div className={styles.label1}>
                          <label htmlFor="adults">Adults</label>
                        </div>
                        <div className={styles.ranger}>
                          <span>
                            <RiSubtractLine
                              onClick={handleGuestDecrement}
                              className={styles.sub}
                            />
                          </span>
                          <span>{guests}</span>
                          <span>
                            <IoMdAdd
                              onClick={handleGuestIncrement}
                              className={styles.add}
                            />
                          </span>
                        </div>
                      </div>
                      <div className={styles.item2}>
                        <div className={styles.label2}>
                          <label htmlFor="rooms">Rooms</label>
                        </div>
                        <div className={styles.ranger}>
                          <span>
                            <RiSubtractLine
                              onClick={handleRoomDecrement}
                              className={styles.sub}
                            />
                          </span>
                          <span>{rooms}</span>
                          <span>
                            <IoMdAdd
                              onClick={handleRoomIncrement}
                              className={styles.add}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={styles["action-btn"]}>
                      <button onClick={handleDropdownClose}>Done</button>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles["btn-label"]}>
              <label htmlFor="search" className={styles["search-btn"]}>
                <button
                  type="submit"
                  name="search"
                  id="search"
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </label>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

LoginedSearchbar.propTypes = {
  address: PropTypes.string,
  guests: PropTypes.number,
  rooms: PropTypes.number,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
};
export default LoginedSearchbar;
