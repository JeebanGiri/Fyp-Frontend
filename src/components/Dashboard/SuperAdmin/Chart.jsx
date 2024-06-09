// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { LineChart, axisClasses } from '@mui/x-charts';

// import Title from './Title';

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount: amount ?? null };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00'),
// ];

// export default function Chart() {
//   const theme = useTheme();

//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
//         <LineChart
//           dataset={data}
//           margin={{
//             top: 16,
//             right: 20,
//             left: 70,
//             bottom: 30,
//           }}
//           xAxis={[
//             {
//               scaleType: 'point',
//               dataKey: 'time',
//               tickNumber: 2,
//               tickLabelStyle: theme.typography.body2,
//             },
//           ]}
//           yAxis={[
//             {
//               label: 'Sales ($)',
//               labelStyle: {
//                 ...theme.typography.body1,
//                 fill: theme.palette.text.primary,
//               },
//               tickLabelStyle: theme.typography.body2,
//               max: 2500,
//               tickNumber: 3,
//             },
//           ]}
//           series={[
//             {
//               dataKey: 'amount',
//               showMark: false,
//               color: theme.palette.primary.light,
//             },
//           ]}
//           sx={{
//             [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
//             [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
//             [`& .${axisClasses.left} .${axisClasses.label}`]: {
//               transform: 'translateX(-25px)',
//             },
//           }}
//         />
//       </div>
//     </React.Fragment>
//   );
// }

import Box from "@mui/material/Box";
import styles from "./Chart.module.css";
import Hotel from "../../../assets/Hotel/hotelstar.png";
import Room from "../../../assets/Room/rooms.png";
import ShoppingCartIcon from "../../../assets/Room/cart.png";
import {
  getHotelCount,
  getTotalBooking,
  getTotalRoom,
} from "../../../constants/Api";
import { useQuery } from "react-query";

export default function Chart() {
  const jwt = localStorage.getItem("token");
  const { data: totalHotel } = useQuery("total-hotel", () =>
    getHotelCount(jwt)
  );
  const { data: totalBook } = useQuery("total-book", () =>
    getTotalBooking(jwt)
  );
  const { data: totalRooms } = useQuery("total-rooms", () => getTotalRoom(jwt));

  const hotelCount = totalHotel ? totalHotel.data : [];
  const bookingCount = totalBook ? totalBook.data : [];
  const roomCount = totalRooms ? totalRooms.data : [];

  if (bookingCount > 10000) {
    bookingCount + "+";
  } else {
    bookingCount;
  }

  return (
    <>
      <Box
        height={150}
        width={250}
        my={4}
        display="grid"
        gap={1}
        p={2}
        sx={{ border: "1px solid whitesmoke" }}
      >
        <p style={{ fontSize: "18px", fontWeight: 500 }}>
          Total Hotel Availiable
        </p>
        <div className={styles.building}>
          <p>{hotelCount}</p>
          <p>
            <img
              src={Hotel}
              alt="Hotel"
              style={{ height: "30px", width: "30px" }}
            />
          </p>
        </div>
      </Box>
      <Box
        height={150}
        width={250}
        my={4}
        display="grid"
        gap={1}
        p={2}
        sx={{ border: "1px solid whitesmoke" }}
      >
        <p style={{ fontSize: "18px", fontWeight: 500 }}>Total Rooms</p>
        <div className={styles.bed}>
          <p>{roomCount}</p>
          <p>
            <img
              src={Room}
              alt="Room"
              style={{ height: "30px", width: "30px" }}
            />
          </p>
        </div>
      </Box>
      <Box
        height={150}
        width={250}
        my={4}
        display="grid"
        gap={1}
        p={2}
        sx={{ border: "1px solid whitesmoke" }}
      >
        <p style={{ fontSize: "18px", fontWeight: 500 }}>Total Booking</p>
        <div className={styles.booking}>
          <p>{bookingCount}</p>
          <p>
            <img
              src={ShoppingCartIcon}
              alt="Cart"
              style={{ height: "30px", width: "30px" }}
            />
          </p>
        </div>
      </Box>
    </>
  );
}
