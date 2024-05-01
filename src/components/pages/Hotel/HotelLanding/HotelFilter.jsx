import "./HotelFilter.css";
import Slider from "react-slider";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const MIN = 100;
const MAX = 10000;
const HotelFiltering = () => {
  const [values, setValues] = useState([MIN, MAX]);
  //   const [searchParams, setSearchParam] = useSearchParams();
  //   const getAddress = searchParams.get("address");

  //   const fetchHotelData = async () => {
  //     if (!getAddress) return [];
  //     const response = await searchHotelByAddress(getAddress);
  //     return response.data;
  //   };

  //   const { data, refetch } = useQuery("filter-hotel", fetchHotelData);

  //   const handleViewMap = () => {
  //     navigateTo("/view-location", { state: { data } });
  //   };

  return (
    <>
      <div className="panel1">
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
    </>
  );
};
export default HotelFiltering;
