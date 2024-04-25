import { useEffect, useState } from "react";
import styles from "./HotelLanding.module.css";
import "./HotelLanding.css";
import { CiLocationOn } from "react-icons/ci";
import { Rate } from "antd";
import Slider from "react-slider";
import { BACKEND_URL } from "../../../../constants/constant";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Marker from "../../../../assets/Hotel/marker.png";
import Maps from "../../../../assets/Hotel/maps.png";

import {
  getHotelRoomAvailiability,
  searchHotelByAddress,
} from "../../../../constants/Api";
import LoginedSearchbar from "../../../Resuable/Searchbar/Logined-Searchbar/LoginedSearchBar";

var desc = ["terrible", "bad", "normal", "good", "wonderful"];

const MIN = 100;
const MAX = 10000;

const HotelLanding = () => {
  const navigateTo = useNavigate();
  const [values, setValues] = useState([MIN, MAX]);
  const [searchParams, setSearchParam] = useSearchParams();

  // Fetch the details of user input for searching hotel by their preference
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

  useEffect(() => {
    // Use the retrieved values to set the state
    setCheckInDate(getCheckIn ? new Date(getCheckIn) : new Date());
    setCheckOutDate(getCheckOut ? new Date(getCheckOut) : new Date());
    setGuests(getGuests ? getGuests : 1);
    setRooms(getRooms ? getRooms : 1);
    setAddress(getAddress || "");
  }, [getCheckIn, getCheckOut, getAddress, getGuests, getRooms]);

  const fetchHotelData = async () => {
    if (!getAddress) return [];
    const response = await searchHotelByAddress(getAddress);
    return response.data;
  };

  const { data, refetch } = useQuery("filter-hotel", fetchHotelData);

  const handleViewMap = () => {
    navigateTo("/view-location", { state: { data } });
  };

  //----------- Extract hotel IDs -----------------
  const fetchRoomStatus = async (hotel_id) => {
    try {
      const info = await getHotelRoomAvailiability(hotel_id)
        .then((response) => {
          console.log(response);
          const message = response.data.message;
          toast.success(message);
          navigateTo(
            `/room-landing/${hotel_id}/?address=${address}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}&rooms=${rooms}`
          );
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
      return info;
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  // Filter hotels based on the converted NPR values
  useEffect(() => {
    refetch();
  }, [getGuests, refetch]);

  const gotoRooms = (hotel_id) => {
    const info = fetchRoomStatus(hotel_id);
    if (info) {
      navigateTo(
        `/room-landing/${hotel_id}/?address=${address}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}&rooms=${rooms}`
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.header}>
        <LoginedSearchbar
          address={address}
          guests={parseInt(guests)}
          rooms={parseInt(rooms)}
          checkIn={checkInDate}
          checkOut={checkOutDate}
          setSearchParam={setSearchParam}
        />
      </div>
      <div className={styles["landing-page"]}>
        <div className="panel1">
          <div className="filtering1">
            <div className="mapsimg">
              <img src={Maps} alt="" />
            </div>
            <div className="contents">
              <img src={Marker} alt="" />
              <p onClick={handleViewMap}>Search On Map</p>
            </div>
          </div>
          <div className="filtering2">
            <h5 className="topic">Your budget (per night)</h5>
            <div className="sliderbox">
              <h4>
                Prices <span>Range</span>
              </h4>
              <div className={"values"}>
                ${values[0]} - ${values[1]}
              </div>
              <small className="ranges">
                Current Range: ${values[0]} - ${values[1]}
              </small>
              <Slider
                className={"slider"}
                // onChange={setValues}
                onChange={(newValue) => setValues(newValue)}
                value={values}
                min={MIN}
                max={MAX}
              />
            </div>
          </div>
          <hr />
          <p className="popfilter">Popular Filter</p>
        </div>
        <div className={styles.panel2}>
          {data?.map((hotels) => (
            <div className={styles["landing-container"]} key={hotels.id}>
              <div className={styles.container1}>
                <div className={styles["hotel-image"]}>
                  <img
                    src={
                      `${BACKEND_URL}/static/hotel_admin/register-hotel/` +
                      hotels.avatar
                    }
                    alt="Hotel Image"
                  />
                </div>
                <div className={styles.articles}>
                  <span className={styles.firstline}>
                    <h5 key={hotels.id}>{hotels.name}</h5>

                    <p className={styles.rating}>
                      <Rate
                        tooltips={desc}
                        disabled
                        defaultValue={hotels.rating_value}
                      />
                    </p>
                  </span>
                  <span className={styles.secondline}>
                    <span>
                      <p>
                        <CiLocationOn className={styles.icon} />
                        <span className={styles.locationlink}>
                          {hotels.address}- <span>View on Map</span>
                        </span>
                      </p>
                    </span>
                    {hotels.rooms.map((room) => (
                      <>
                        <p>{room.room_type}</p>
                      </>
                    ))}

                    <button
                      onClick={() => gotoRooms(hotels.id)}
                      key={hotels.id}
                    >
                      See Rooms
                    </button>
                  </span>
                </div>
              </div>
              <div className={styles.container2}>
                <div className={styles.justify}>
                  <h5 className={styles.topcontent}>Very Good</h5>
                  <span className={styles.sider}>
                    <p className={styles["btn-contents"]}>1 night, 1 adult</p>

                    {hotels.rooms.map((room) => (
                      <>
                        <h3>NPR {room.room_rate}</h3>
                      </>
                    ))}
                    <p>Include Tax and Charge</p>
                  </span>
                  <span className={styles.footer}>
                    <button onClick={() => fetchRoomStatus(hotels.id)}>
                      Check Availiability
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HotelLanding;
