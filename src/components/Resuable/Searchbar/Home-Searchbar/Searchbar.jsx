import { useState, useEffect, useRef } from "react";
import styles from "./Searchbar.module.css";
import { IoBedOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { MdPeople } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { UseOutsideClick } from "../../../../utils/useOutSideClick";

const customStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    width: "350px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: () => ({ display: "none" }),
};

const options = [
  { value: "Biratchowk", label: "Biratchowk" },
  { value: "Itahari", label: "Itahari" },
  { value: "Dharan", label: "Dharan" },
  { value: "Biratnagar", label: "Biratnagar" },
  { value: "Pokhara", label: "Pokhara" },
  { value: "kathmandu", label: "Kathmandu" },
  { value: "Damak", label: "Damak" },
  { value: "Mustang", label: "Mustand" },
  { value: "Manang", label: "Manang" },
  { value: "patan", label: "Patan" },
  { value: "Basantapur", label: "Basantapur" },
  { value: "Dhankuta", label: "Dhankuta" },
  { value: "Deomy", label: "Deomy Place" },
  {
    value: "Sundarharaincha-12, Morang Nepal",
    label: "Sundarharaincha-12, Morang Nepal",
  },
];

const SearchBar = () => {
  const navigateTo = useNavigate();
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [checkInWeekday, setCheckInWeekday] = useState("");
  const [checkOutWeekday, setCheckOutWeekday] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [address, setAddress] = useState("");
  const DropdownBoxRef = useRef();

  UseOutsideClick(() => setIsGuestDropdownOpen(false), DropdownBoxRef);

  useEffect(() => {
    if (checkInDate) {
      const newCheckInWeekday = format(checkInDate, "EEEE");
      setCheckInWeekday(newCheckInWeekday);
      // Automatically select to the next day
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate) {
      const newCheckOutWeekday = format(checkOutDate, "EEEE");
      setCheckOutWeekday(newCheckOutWeekday);
    }
  }, [checkOutDate]);

  const handleSelectChange = (selectedOption) => {
    // For Select component, directly set the value without using event.target
    setAddress(selectedOption.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateTo(
      `/hotel-landing?address=${address}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}&rooms=${rooms}`
    );
  };

  const handleDateClick = (event) => {
    event.preventDefault();
    setIsDateOpen(!isDateOpen);
  };

  const handleCheckInDateChange = (date, event) => {
    event.target.value;
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

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
    event.stopPropagation();
    setIsGuestDropdownOpen(!isGuestDropdownOpen);
  };

  const handleDropdownClose = (event) => {
    event.preventDefault();
    setIsGuestDropdownOpen(false);
  };

  return (
    <>
      <div className={styles.searchbar}>
        <form className={styles["search-form"]} onSubmit={handleSubmit}>
          <div className={styles.places}>
            <div className={styles.icon}>
              <IoBedOutline />
            </div>
            <div className={styles["place-label"]}>
              <label htmlFor="destination">
                <Select
                  options={options}
                  name="address"
                  id="destination"
                  placeholder="Enter a destination or property"
                  className={styles["inputs-text"]}
                  onChange={handleSelectChange}
                  styles={customStyles}
                />
              </label>
            </div>
          </div>
          <div className={styles["main-content"]}>
            <div className={styles.dates} onClick={handleDateClick}>
              <div className={styles["check-in-dlabel"]}>
                <div className={styles.icon}>
                  <CiCalendarDate />
                </div>
                <div className={styles["check-In-label"]}>
                  <label htmlFor="checkin">
                    <DatePicker
                      selected={checkInDate}
                      onChange={handleCheckInDateChange}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Check-In Date"
                      className={styles["date-picker"]}
                    />
                    {checkInDate && <br />}
                    <span className={styles.weekday}>
                      {checkInDate && checkInWeekday}
                    </span>
                  </label>
                </div>
              </div>
              <hr className={styles.line} />
              <div className={styles["check-out-dlabel"]}>
                <div className={styles.icon}>
                  <CiCalendarDate />
                </div>
                <div className={styles["check-out-label"]}>
                  <label htmlFor="checkout">
                    <DatePicker
                      selected={checkOutDate}
                      onChange={handleCheckOutDateChange}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Check-Out Date"
                      className={styles["date-picker"]}
                    />
                    {checkOutDate && <br />}
                    <span className={styles.weekdays}>
                      {checkOutDate && checkOutWeekday}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.guest}>
              <div className={styles["guest-field"]} ref={DropdownBoxRef}>
                <button
                  className={styles["guest-container"]}
                  onClick={toggleGuestDropdown}
                >
                  <span className={styles["span-container"]}>
                    <span className={styles.class1}>
                      <MdPeople />
                    </span>
                    <span className={styles.spaninput}>
                      {guests === 1 ? "1 Adult" : `${guests} Adults`} .{" "}
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
                          <span className={styles.sub}>
                            <RiSubtractLine onClick={handleGuestDecrement} />
                          </span>
                          <span>{guests}</span>
                          <span className={styles.add}>
                            <IoMdAdd onClick={handleGuestIncrement} />
                          </span>
                        </div>
                      </div>
                      <div className={styles.item2}>
                        <div className={styles.label2}>
                          <label htmlFor="rooms">Rooms</label>
                        </div>
                        <div className={styles.ranger}>
                          <span className={styles.sub}>
                            <RiSubtractLine onClick={handleRoomDecrement} />
                          </span>
                          <span>{rooms}</span>
                          <span className={styles.add}>
                            <IoMdAdd onClick={handleRoomIncrement} />
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
          </div>

          <div className={styles["btn-label"]}>
            <label htmlFor="search" className={styles["search-btn"]}>
              <button
                type="submit"
                name="search"
                id="search"
              >
                Search
              </button>
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
