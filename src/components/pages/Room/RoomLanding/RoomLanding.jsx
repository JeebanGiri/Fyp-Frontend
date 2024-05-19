import styles from "./RoomLanding.module.css";
import { FaChildReaching } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { MdChildCare } from "react-icons/md";
import CheckIn from "../../../../assets/Room/checkin.png";
import CheckOut from "../../../../assets/Room/checkout.jpg";
import { getRoom, getRoomByTypes } from "../../../../constants/Api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants/constant";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useQuery } from "react-query";
import Select from "react-select";
import LoginedSearchbar from "../../../Resuable/Searchbar/Logined-Searchbar/LoginedSearchBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options = [
  { value: "Deluxe Room", label: "Deluxe Room" },
  { value: "Standard Room", label: "Standard Room" },
  { value: "Double Room", label: "Double Room" },
  { value: "Deluxe Double Room", label: "Deluxe Double Room" },
  { value: "Triple Room", label: "Triple Room" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    boxShadow: "none",
    width: "250px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

const RoomLanding = () => {
  // const defaultRoomType = options.find((option) => option.value === "Deluxe Room");
  const [roomInfo, setRoomInfo] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [roomDetail, setRoomDetail] = useState(null);
  const navigateTo = useNavigate();
  const [searchParams, setSearchParam] = useSearchParams();

  const getAddress = searchParams.get("address");
  const getGuests = searchParams.get("guests");
  const getRooms = searchParams.get("rooms");
  const getCheckIn = searchParams.get("checkInDate");
  const getCheckOut = searchParams.get("checkOutDate");

  const [checkInDate, setCheckInDate] = useState(
    getCheckIn ? new Date(getCheckIn) : new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    getCheckOut ? new Date(getCheckOut) : new Date()
  );
  const [guests, setGuests] = useState(getGuests ? getGuests : 1);
  const [rooms, setRooms] = useState(getRooms ? getRooms : 1);
  const [address, setAddress] = useState(getAddress || "");

  // --------- GETTING EACH RENDERING VALUES---------
  useEffect(() => {
    // Use the retrieved values to set the state
    setCheckInDate(getCheckIn ? new Date(getCheckIn) : new Date());
    setCheckOutDate(getCheckOut ? new Date(getCheckOut) : new Date());
    setGuests(getGuests ? getGuests : 1);
    setRooms(getRooms ? getRooms : 1);
    setAddress(getAddress || "");
  }, [getCheckIn, getCheckOut, getAddress, getGuests, getRooms]);

  const { hotelId } = useParams();

  const { data } = useQuery(["fetch-data", hotelId], () => getRoom(hotelId));
  console.log(data);
  const roominfo = data ? data?.data : null;

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const info = await getRoomByTypes(roomType, hotelId).catch((error) => {
          console.log(error.response);
          const errorMsg =
            error.response.data.message || error.response.data.error.message;
          if (Array.isArray(errorMsg)) {
            errorMsg.forEach((err) => toast.error(err));
          } else if (errorMsg) {
            toast.error(errorMsg);
          }
        });
        setRoomInfo(info.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    if (roomType && hotelId) {
      fetchRoomInfo();
    }
  }, [roomType, hotelId]);

  // Effect to update roomDetail when roominfo changes
  useEffect(() => {
    if (roomInfo) {
      setRoomDetail(roomInfo);
    } else {
      setRoomDetail(roominfo);
    }
  }, [roomInfo, roominfo]);

  const roomId = roomDetail?.id;
  const room_Type = roomDetail?.room_type;
  const room_Quantity = rooms;

  const goToBook = () => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   toast.warn("Please login first!");
    //   return;
    // }

    navigateTo(
      `/booking/?hotelId=${hotelId}&roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&total_Amount=${total_Amount}&room_Type=${room_Type}&room_Quantity=${room_Quantity}`
    );
  };

  const handleSelectChange = (selectedOption) => {
    setRoomType(selectedOption.value);
  };
  let total_room = rooms;
  let room_price = roomDetail?.room_rate;
  const total_Amount = total_room * room_price;

  return (
    <>
      <ToastContainer />
      <div className={styles.topper}>
        <LoginedSearchbar
          address={address}
          guests={parseInt(guests)}
          rooms={parseInt(rooms)}
          checkIn={checkInDate.toString()}
          checkOut={checkOutDate.toString()}
          setSearchParam={setSearchParam}
        />
      </div>
      {roomDetail
        ? roomDetail && (
            <div key={roomDetail.hotel.id}>
              <div className={styles.roomlanding}>
                <div className={styles.header}>
                  <div className={styles.leftcontent}>
                    <h4>{roomDetail.hotel.name}</h4>
                    <span className={styles.locc}>
                      <p>
                        <FaLocationDot />
                      </p>
                      <p>{roomDetail?.hotel.address}</p>
                    </span>
                    <p className={styles.loctitles}>Excellent Location</p>
                  </div>
                  <div className={styles.middlecontent}>
                    <Select
                      options={options}
                      name="room_type"
                      id="room_type"
                      placeholder="Select room type here"
                      className={styles["inputs-text"]}
                      onChange={handleSelectChange}
                      styles={customStyles}
                    />
                  </div>
                  <div className={styles.bookbtn}>
                    <span className={styles["btn-label"]}>
                      <button onClick={goToBook}>Reserve or Book Now!</button>
                    </span>
                  </div>
                </div>
                <div className={styles.roomimages}>
                  <div className={styles.topp}>
                    <span className={styles.toparticle}>
                      <p className={styles.content1}>
                        Book the {roomDetail?.hotel.name} Hotel
                      </p>
                      <p className={styles.content2}>
                        See all the properties in {roomDetail?.hotel.address}
                      </p>
                    </span>
                  </div>
                  <div className={styles.container}>
                    <div className={styles["img-side1"]}>
                      <div className={styles["hotel-img"]}>
                        <img
                          src={
                            `${BACKEND_URL}/static/hotel_admin/register-hotel` +
                            roomDetail?.hotel.avatar
                          }
                          alt="Images"
                        />
                      </div>
                    </div>
                    <div className={styles["img-side2"]}>
                      <div className={styles.rooms}>
                        <img
                          src={`${BACKEND_URL}/static/rooms/${roomDetail?.images[1]}`}
                          alt="Images"
                        />
                      </div>
                      <span className={styles.rooms}>
                        <img
                          src={`${BACKEND_URL}/static/rooms/${roomDetail?.images[0]}`}
                          alt="Images"
                        />
                      </span>
                      <span className={styles.rooms}>
                        <img
                          src={`${BACKEND_URL}/static/rooms/${roomDetail?.images[0]}`}
                          alt="Images"
                        />
                      </span>
                      <span className={styles.rooms}>
                        <img
                          src={`${BACKEND_URL}/static/rooms/${roomDetail?.images[0]}`}
                          alt="Images"
                        />
                      </span>
                    </div>
                  </div>
                  <div className={styles.pricebox}>
                    NPR. <br />
                    {total_Amount}
                  </div>
                </div>
                <div className={styles.hotelframe}>
                  <div className={styles["big-images"]}>
                    <img
                      src={
                        `${BACKEND_URL}/static/hotel_admin/register-hotel` +
                        roomDetail?.hotel.avatar
                      }
                      alt="Images"
                    />
                    <div className={styles.hoteltitles}>
                      <p>More About</p>
                      <p>The Hotel {roomDetail?.hotel.name}</p>
                    </div>
                  </div>
                  <div className={styles.description}>
                    <p>Description</p>
                    <p>
                      Horizen Residence is a top most hotel in lumbini which
                      serve a 1000 of cutomer monthly. <br />
                      {roomDetail?.hotel.description}
                    </p>
                  </div>
                </div>
                <div className={styles.locationframe}>
                  <div className={styles["loc-titles"]}>
                    <div className={styles.leftposition}>
                      <h5>Location</h5>
                      <p>{roomDetail?.hotel.address}</p>
                    </div>
                    <div className={styles.rightposition}>
                      <h5>Excellent</h5>
                      <p>Location</p>
                    </div>
                  </div>
                </div>
                <div className={styles["property-poilcies"]}>
                  <span className={styles["policy-titles"]}>
                    <h5>Property policies</h5>
                    <h6>Children and Extra Beds</h6>
                    <p>
                      Extra beds are dependent on the room you choose. Please
                      check the individual room capacity for more details.
                    </p>
                    <p>All Children are Welcome</p>
                  </span>
                  <div className={styles["children-box"]}>
                    <span className={styles.box1}>
                      <span className={styles["child-head"]}>
                        <span>
                          <MdChildCare />
                        </span>
                        <p>Infant 0-5 year(s)</p>
                      </span>
                      <hr />
                      <span className={styles["box-contents"]}>
                        <p>Stay for free if using existing bedding.</p>
                        <p>Baby cot/crib available upon request</p>
                      </span>
                    </span>
                    <span className={styles.box1}>
                      <span className={styles["child-head"]}>
                        <span>
                          <FaChildReaching />
                        </span>
                        <p>Children 6-7 year(s)</p>
                      </span>
                      <hr />
                      <span className={styles["box-contents"]}>
                        <p>Stay for free if using existing bedding.</p>
                        <p>
                          If you need an extra bed, it will incur an additional
                          charge.
                        </p>
                      </span>
                    </span>
                    <span className={styles.box1}>
                      <span className={styles["child-head"]}>
                        <span>
                          <GoPeople />
                        </span>
                        <p>Guests 8 years and older are considered as adults</p>
                      </span>
                      <hr />
                      <p className={styles.guestinfo}>
                        Must use an extra bed which will incur an additional
                        charge.
                      </p>
                    </span>
                  </div>
                  <span className={styles.facts}>
                    <h5>Others</h5>
                    <p>
                      When booking more than 5 rooms, different policies and
                      additional supplements may apply.
                    </p>
                    <h5>Some helpful facts</h5>
                  </span>
                  <hr />
                  <div className={styles.rules}>
                    <span className={styles.rules1}>
                      <h6>Check-in/Check-out</h6>
                      <li>
                        <img src={CheckIn} alt="" /> Check-in from: <b>14:00</b>
                      </li>
                      <li>
                        <img src={CheckOut} alt="" /> Check-in untill:{" "}
                        <b>12:00</b>
                      </li>
                      <li>
                        <img src={CheckOut} alt="" /> Recption open untill:
                        <b>22:00</b>
                      </li>
                    </span>
                  </div>
                </div>
                <div className={styles["recommend-property"]}>
                  <p>Recommended properties nearby</p>
                </div>
              </div>
            </div>
          )
        : null}
    </>
  );
};
export default RoomLanding;
