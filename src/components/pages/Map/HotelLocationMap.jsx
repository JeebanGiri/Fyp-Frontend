import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./HotelLocationMap.module.css";
import { useState } from "react";
import { Input } from "antd";
import { getHotel, setHotelLocation } from "../../../constants/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PropTypes from "prop-types";
import { useQuery } from "react-query";
const { Search } = Input;

export default function HotelLocationMap() {
  const token = localStorage.getItem("token");

  const [latitude, setLatitude] = useState(27.7000769);
  const [longitude, setLongitude] = useState(85.324);

  const { data: fetchHotelInfo } = useQuery("hotel-info", () =>
    getHotel(token)
  );
  const hotelInfo = fetchHotelInfo?.data;

  // const hotelIdString = hotelId && hotelId.length > 0 ? hotelId[0].id : null;

  console.log(hotelInfo);
  const hotelIdString = hotelInfo;

  const onMapClick = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const hotelData = { latitude, longitude };
    // console.log(hotelId);
    setHotelLocation(hotelData, hotelIdString, token)
      .then((response) => {
        console.log(response);
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
  };

  const customIcons = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
    iconSize: [38, 38],
  });

  function LocationMarker() {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return (
      <Marker position={[latitude, longitude]} icon={customIcons}>
        <Popup>Hello This is Hotel</Popup>
      </Marker>
    );
  }

  const defaultCenter = [27.7000769, 85.324];
  const center =
    latitude !== null && longitude !== null
      ? [latitude, longitude]
      : defaultCenter;

  return (
    <>
      <ToastContainer />
      <div className={styles["container"]}>
        <div className={styles.searchbar1}>
          <span className={styles.locsearch}>
            <p>Select the location of the property</p>
          </span>
          <div className={styles.searchbox}>
            <span className={styles.search}>
              <Search
                placeholder="search location"
                enterButton="Search"
                size="large"
                className={styles.search}
              />
              <p>Search Location for: </p>
            </span>
            <span className={styles.content}>
              <span>
                <p>Latitude:</p>
              </span>
              <span>
                <p>Longitude:</p>
              </span>
              <span>
                <p>Location:</p>
              </span>
            </span>
          </div>
        </div>

        <div className={styles["map-container"]}>
          <MapContainer
            center={center}
            zoom={16}
            // style={{ height: "100%", width: "100%" }}
            className={styles["leaflet-container"]}
          >
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
      <div className={styles.set}>
        <p type="submit" onClick={handleSubmit}>
          Set
        </p>
      </div>
    </>
  );
}
// HotelLocationMap.propTypes = {
//   hotelId: PropTypes.string.isRequired,
//   handleMapClick: PropTypes.func.isRequired,
// };
