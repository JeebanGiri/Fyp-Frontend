import "leaflet/dist/leaflet.css";
import "./Map.module.css";
import { MapContainer } from "react-leaflet";
import HotelLocationMap from "./HotelLocationMap";

const Map = () => {
  return (
    <MapContainer zoom={8}>
      <HotelLocationMap />
    </MapContainer>
  );
};

export default Map; 
