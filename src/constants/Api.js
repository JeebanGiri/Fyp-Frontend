import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8848",
});

export const createUser = (newUser, token) =>
  api
    .post("/users", newUser, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const updateProfile = (updateProfile, token) =>
  api.patch("/users/current-user", updateProfile, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const changePassword = (updatePassword, token) =>
  api.patch("/users/change-password", updatePassword, {
    headers: { Authorization: `Bearer ${token}` },
  });

// -------create hotel-----------
export const createHotel = async (newHotel, token) =>
  await api.post("/hoteladmin/register-hotel", newHotel, {
    headers: { Authorization: `Bearer ${token}` },
  });

// -------update hotel------------
export const updateHotel = async (hotel_id, editHotel, token) =>
  await api.patch(`/hoteladmin/update-hotel/${hotel_id}`, editHotel, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const registerHotel = (newHotel, token) =>
  api.post("/superadmin/register-hotel", newHotel, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approveHotel = (hotelId, token) =>
  api.post(`/superadmin/approve-hotel/${hotelId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --------GET HOTEL BY HOTEL ID (RESERVATION DATA)-----------
export const getHotelInfo = (hotelId) => api.get(`/hotel/find/${hotelId}`);

//-----------SEARCH HOTEL--------------
export const searchHotelByAddress = (hotelAddress, minPrice, maxPrice) =>
  api.get(
    `/hotel/search/address/?address=${hotelAddress}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );

// export const searchHotelByAddress = (hotelAddress, hotelRooms) =>
// api.get(`/hotel/search/address/?address=${hotelAddress}/rooms=${hotelRooms}`);

// ---------GET PROFILE------------
export const userProfile = (token) =>
  api.get("/users/current-user", {
    headers: { Authorization: `Bearer ${token}` },
  });

// -----------CREATE ROOMS (HOTEL ADMIN) --------------
export const createRoom = (createRooms, hotel_id, token) =>
  api.post(`/rooms/register/${hotel_id}`, createRooms, {
    headers: { Authorization: `Bearer ${token}` },
  });

// // --------GET ALL Rooms (Room Landing) ---------------
export const getRoom = (hotelId) => api.get(`/rooms/getrooms/${hotelId}`);

//------------ GET A SELECTED ROOM (ROOM LANDING)---------------
// export const getOneRoom = (roomId) => api.get(`/rooms/getrooms/${roomId}`);

//-----------GET ROOM BY ROOM TYPES-----------------
export const getRoomByTypes = (roomType, hotelId) =>
  api.get(`/rooms/types/${roomType}/${hotelId}`);

// -----------GET HOTEL (HOTEL ADMIN)-------------
export const getHotel = (token) =>
  api.get("/hoteladmin", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ----------GET ROOMS (HOTEL ADMIN)-------------
export const getRooms = (token) =>
  api.get("/rooms", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllRooms = (hotel_id, token) =>
  api.get(`/hotel/get-rooms/${hotel_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const findAllRooms = (hotel_id, token) =>
  api.get(`/rooms/get-rooms/${hotel_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// -------GET HOTEL AVAILIABILITY--------------
export const getHotelRoomAvailiability = (hotelId) =>
  api.get(`/rooms/check-status/${hotelId}`);

// ----------DELETE HOTEL------------------
export const deleteHotel = (hotelId, token) =>
  api.delete(`/hotel/${hotelId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ----------DELETE THE ROOMS ----------------
export const deleteRoom = (roomId, token) =>
  api.delete(`/rooms/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

//---------REGISTER BEFORE BOOK---------------
export const registerUserForBook = (registerUser) =>
  api.post("/auth/register", registerUser);

// ---------BOOK HOTEL-------------
// export const reserveHotel = (
//   hotelId,
//   roomId,
//   roomType,
//   roomQuantity,
//   totalAmount,
//   checkInDate,
//   checkOutDate,
//   bookData,
//   gateway,
//   token
// ) =>
//   api.post(
//     `/reservation/reserve/${hotelId}/${roomId}/${roomType}/${roomQuantity}/${totalAmount}/${checkInDate}/${checkOutDate}`,
//     bookData,
//     gateway,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// ---------BOOK HOTEL-------------
export const reserveHotel = (bookingDetails, token) =>
  api.post(
    `/reservation/reserve/${bookingDetails.hotelId}/${bookingDetails.roomId}/${bookingDetails.room_Type}/${bookingDetails.room_Quantity}/${bookingDetails.total_Amount}/${bookingDetails.checkIn_Date}/${bookingDetails.checkOut_Date}`,
    { ...bookingDetails },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

// console.log(bookData, gateway, token);

export const getReservation = (token) =>
  api.get("/reservation/get-reservation", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getAllReservation = (token) =>
  api.get("/reservation/get-all-reservation", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ----------DELETE THE ROOMS ----------------
export const deleteReservation = (bookId, token) =>
  api.delete(`/reservation/remove/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// export const deleteReservation = (bookId, token) =>
//   api.delete(`/reservation/${bookId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getAllHotel = (token) =>
  api.get("superadmin/hotels/all", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getHotelCount = (token) =>
  api.get("superadmin/hotel/total", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalBooking = (token) =>
  api.get("superadmin/reservation/total", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalRoom = (token) =>
  api.get("superadmin/rooms/total", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalBookingHotelAdmin = (token) =>
  api.get("hoteladmin/find/totalbooking", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalRoomHotelAdmin = (token) =>
  api.get("hoteladmin/find/totalrooms", {
    headers: { Authorization: `Bearer ${token}` },
  });

// export const getAll = (token) =>
// api.get("superadmin/rooms/total", {
//   headers: { Authorization: `Bearer ${token}` },
// });

// ----------GET TOTAL ROOM (HOTEL ADMIN)-------------
export const getTotalRooms = (token) =>
  api.get("hoteladmin/find/totalrooms", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalReservation = (token) =>
  api.get("/hoteladmin/find/totalbooking", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalRating = (token) =>
  api.get("/hoteladmin/find/totalrating", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTotalIncomeHotelAdmin = (token) =>
  api.get("/hoteladmin/find/total-income", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllCustomer = (token) =>
  api.get("/hoteladmin/find/customer", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const setHotelLocation = (hotelData, hotelId, token) =>
  api.post(`/hotel/set-location/${hotelId}`, hotelData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveNotificationToken = (data, token) => {
  return api.post("/firebase/save-token", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getNotification = (token) =>
  api.get("/notification", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const filterHotelByPrice = () => api.get(`/hotel/filter-hotels-price`);

export const getTotalPrice = (token) =>
  api.get("/reservation/get-all", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateRooms = (roomId, payload, token) =>
  api.patch(`/rooms/${roomId}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRoomById = (room_id, token) =>
  api.get(`/rooms/find-room/${room_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const generateCustomerReport = (token, bookId, user_id, checkInDate) =>
  api.get(`/reservation/generate-report/${bookId}/${user_id}/${checkInDate}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const rateHotel = (rateInfo, token) =>
  api.post("/rating/rate-hotel", rateInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProfilePhoto = (formData, token) =>
  api.patch("/users/update-profile", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
