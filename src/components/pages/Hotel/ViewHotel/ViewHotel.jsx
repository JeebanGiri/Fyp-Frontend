import { deleteHotel, getHotel } from "../../../../constants/Api";
import styles from "./ViewHotel.module.css";
import { useQuery, useQueryClient } from "react-query";
import { Modal, Space, Table } from "antd";
import { BACKEND_URL } from "../../../../constants/constant";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useState } from "react";
import AddRoomsPopup from "../../Room/AddRoomsForms/AddRoomsPopup";
import HotelLocationMap from "../../Map/HotelLocationMap";
import { useNavigate } from "react-router-dom";

const ViewHotel = () => {
  const [isAddRoomsOpen, setIsAddRoomsOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  const { data: hotelInfoResponse } = useQuery("hoteldetails", () =>
    getHotel(token)
  );

  // Extract the actual hotel data from the response
  const hotelInfo = hotelInfoResponse?.data;

  // Ensure hotelInfo is wrapped in an array
  const tableData = hotelInfo ? [hotelInfo] : [];

  console.log(tableData);
  const hotelId = hotelInfo?.id || "";

  const toggleAddRooms = () => {
    setIsAddRoomsOpen(!isAddRoomsOpen);
  };

  const toogleEditHotelPage = () => {
    navigateTo("/hoteladmin-dashboard/edit-hotel");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showAddRoomModal = () => {
    setIsAddRoomModalOpen(true);
  };
  const handleAddRoomOk = () => {
    setIsAddRoomModalOpen(false);
  };
  const handleAddRoomCancel = () => {
    setIsAddRoomModalOpen(false);
  };

  const handleMapClick = () => {
    setOpenMap(!openMap);
  };

  const handleDeleteHotel = async (hotel_Id) => {
    console.log(hotel_Id, "hotel");
    try {
      await deleteHotel(hotel_Id, token);
      queryClient.invalidateQueries("hoteldetails");

      // Optimistically update the frontend state by removing the deleted room
      queryClient.setQueryData("hoteldetails", (oldData) =>
        oldData.filter((hotel) => hotel.id !== hotel_Id)
      );

      // Optionally, you can refetch the data to ensure consistency with the backend
      await queryClient.refetchQueries("hoteldetails");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Hotel Name",
      dataIndex: "name",
      key: "hotel_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Check-In",
      dataIndex: "checkin_checkout",
      key: "checkin",
      render: (checkin_checkout) => checkin_checkout?.check_in_time,
    },
    {
      title: "Check-Out",
      dataIndex: "checkin_checkout",
      key: "checkout",
      render: (checkin_checkout) => checkin_checkout?.check_out_time,
    },
    {
      title: "Hotel Status",
      dataIndex: "status",
      key: "rating_value",
    },
    {
      title: "Rating",
      dataIndex: "rating_value",
      key: "rating_value",
    },
    {
      title: "Avatar",
      key: "avatar",
      dataIndex: "avatar",
      render: (avatar) => (
        <>
          <img
            src={`${BACKEND_URL}/static/hotel_admin/register-hotel/${avatar}`}
            alt="Images"
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
          {console.log(record.id, "id of hotel")}
          <Button primary onClick={toogleEditHotelPage}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the hotel"
            description="Are you sure to delete this hotel?"
            onConfirm={() => handleDeleteHotel(record.id)}
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
  return (
    <>
      <div className={styles.hotelinfo}>
        <div className={styles.titles}>
          <span>
            <h4>Hotel Information</h4>
          </span>
          <span>
            <span className={styles["add-room"]}>
              <button onClick={showModal}>Set Location</button>
            </span>
            <span className={styles.modal}>
              {/* {openMap && (
                <HotelLocationMap
                  hotelId={hotelId}
                  handleMapClick={handleMapClick}
                />
              )} */}
              <Modal
                title="Set Hotel Location"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={900}
                footer={null}
              >
                <HotelLocationMap
                  hotelId={hotelId}
                  handleMapClick={handleMapClick}
                />
              </Modal>
            </span>
            <span className={styles["add-room"]}>
              <button onClick={showAddRoomModal}>Add Rooms</button>
              <Modal
                title="Add Rooms"
                open={isAddRoomModalOpen}
                onOk={handleAddRoomOk}
                onCancel={handleAddRoomCancel}
                width={600}
                footer={null}
              >
                <AddRoomsPopup toggle={handleAddRoomOk} hotelId={hotelId} />
              </Modal>
            </span>
          </span>
        </div>

        <div className={styles["view-tables"]}>
          <Table columns={columns} rowKey={"id"} dataSource={tableData} />
        </div>
      </div>
    </>
  );
};
export default ViewHotel;
