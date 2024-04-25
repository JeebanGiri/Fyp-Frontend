import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { useLocation } from "react-router-dom";

export default function ViewHotelLocation() {
  const location = useLocation();
  const [hotelLocation, setHotelLocation] = useState([]);

  useEffect(() => {
    if (location.state && location.state.data) {
      const hotelInfo = location.state.data;
      setHotelLocation(hotelInfo);
    }
  }, [location]);

  const customIcons = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
    iconSize: [38, 38],
  });

  console.log(hotelLocation, "location of hotel");

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
      <MapContainer
        center={[27.7000769, 85.324]}
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
