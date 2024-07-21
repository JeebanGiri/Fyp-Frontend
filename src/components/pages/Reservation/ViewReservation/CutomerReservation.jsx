import { useQuery, useQueryClient } from "react-query";
import styles from "./CustomerReservation.module.css";
import { Space, Table } from "antd";
import { deleteReservation, getReservation } from "../../../../constants/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Modal } from "antd";
import { formatDate } from "../../../../utils/formatDate";
import { useState } from "react";
import { BACKEND_URL } from "../../../../constants/constant";
import Rating from "../../Rating/Rating";

const ViewBooking = () => {
  const token = localStorage.getItem("token");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState(null);

  const showRatingModal = (hotelId) => {
    setIsRatingOpen(true);
    setCurrentHotelId(hotelId);
  };

  const handleRatingOk = () => {
    setIsRatingOpen(false);
  };

  const handleRatingCancel = () => {
    setIsRatingOpen(false);
  };
  const { data } = useQuery("reservation", () => getReservation(token));
  console.log(data, "My booking");

  const queryClient = useQueryClient();
  const handleDeleteReservation = async (bookId) => {
    try {
      await deleteReservation(bookId, token);
      console.log(token, "auth token for delete");
      queryClient.invalidateQueries("reservation");

      // Optimistically update the frontend state by removing the deleted room
      queryClient.setQueryData("reservation", (oldData) =>
        oldData.filter((book) => book.id !== bookId)
      );

      // Optionally, you can refetch the data to ensure consistency with the backend
      await queryClient.refetchQueries("reservation");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Address",
      dataIndex: "user_email",
      key: "user_email",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Booking Date",
      dataIndex: "booking_Date",
      key: "booking_Date",
      render: (dataIndex) => formatDate(dataIndex),
    },
    {
      title: "Check-In Date",
      dataIndex: "check_In_Date",
      key: "check_In_Date",
      render: (dataIndex) => formatDate(dataIndex),
    },
    {
      title: "Check-Out Date",
      dataIndex: "check_Out_Date",
      key: "check_Out_Date",
      render: (dataIndex) => formatDate(dataIndex),
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Hotel Image",
      key: "hotel",
      dataIndex: "hotel",
      render: (hotel) => (
        <>
          <img
            src={`${BACKEND_URL}/static/hotel_admin/register-hotel/${hotel.cover}`}
            alt="Service"
            style={{ width: "50px", height: "50px" }}
          />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the Reservation"
            description="Are you sure to delete your Reservation?"
            onConfirm={() => handleDeleteReservation(record.id)}
            onOpenChange={() => console.log("open change")}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button onClick={() => showRatingModal(record.hotel.id)}>Rate</Button>
          {isRatingOpen && (
            <Modal
              title="Rate Hotel"
              open={showRatingModal}
              onOk={handleRatingOk}
              onCancel={handleRatingCancel}
              width={500}
              footer={null}
            >
              <Rating hotelId={currentHotelId} />
            </Modal>
          )}
        </Space>
      ),
    },
  ];

  const bookingData = data?.data;

  return (
    <>
      <div className={styles.roominfo}>
        <div className={styles.titles}>
          <span>
            <h4>Booking Details</h4>
          </span>
        </div>
        <div className={styles["view-tables"]}>
          <Table columns={columns} rowKey={"id"} dataSource={bookingData} />
        </div>
      </div>
    </>
  );
};
export default ViewBooking;
