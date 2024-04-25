import { useQuery, useQueryClient } from "react-query";
import styles from "./CustomerReservation.module.css";
import { Space, Table } from "antd";
import { deleteReservation, getReservation } from "../../../../constants/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const ViewBooking = () => {
  const token = localStorage.getItem("token");

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
    },
    {
      title: "Check-In Date",
      dataIndex: "check_In_Date",
      key: "check_In_Date",
    },
    {
      title: "Check-Out Date",
      dataIndex: "check_Out_Date",
      key: "check_Out_Date",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    // {
    //   title: "Booking Date",
    //   key: "images",
    //   dataIndex: "images",
    //   render: (images) => (
    //     <>
    //       <img
    //         src={`${BACKEND_URL}` + images}
    //         alt="Service"
    //         style={{ width: "50px", height: "50px" }}
    //       />
    //     </>
    //   ),
    // },
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
