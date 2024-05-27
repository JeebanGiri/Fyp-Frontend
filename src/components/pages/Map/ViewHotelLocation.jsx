import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

export default function ViewHotelLocation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hotelLocation, setHotelLocation] = useState([]);
  const [mapCenter, setMapCenter] = useState([27.7000769, 85.324]);

  useEffect(() => {
    if (location.state && location.state.data) {
      const hotelInfo = location.state.data;
      setHotelLocation(hotelInfo);
      if (hotelInfo.length > 0) {
        const avgLat =
          hotelInfo.reduce(
            (sum, hotel) => sum + hotel.location.coordinates[1],
            0
          ) / hotelInfo.length;
        const avgLng =
          hotelInfo.reduce(
            (sum, hotel) => sum + hotel.location.coordinates[0],
            0
          ) / hotelInfo.length;
        setMapCenter([avgLat, avgLng]);
      }
    }
  }, [location]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const customIcons = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
    iconSize: [38, 38],
  });

  const renderAddresses = () => {
    return hotelLocation.map((hotel) => (
      <Marker
        position={[
          hotel.location.coordinates[1],
          hotel.location.coordinates[0],
        ]}
        key={hotel.id}
        icon={customIcons}
      >
        <Popup autoOpen={true} autoClose={false}>
          {hotel.name}
        </Popup>
      </Marker>
    ));
  };
  return (
    <>
      <div className={styles.returns}>
        <button onClick={handleGoBack}>Back</button>
      </div>
      <MapContainer
        // center={[27.7000769, 85.324]}
        center={mapCenter}
        zoom={20}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderAddresses()}
      </MapContainer>
    </>
  );
}
