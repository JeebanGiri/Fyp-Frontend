import { useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from "../../../../constants/constant";
import styles from "./ViewRoom.module.css";
import { Space, Table } from "antd";
import { deleteRoom, findAllRooms, getHotel } from "../../../../constants/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Modal } from "antd";
import AddRoomsPopup from "../AddRoomsForms/AddRoomsPopup";
import { useState } from "react";
import UpdateRooms from "../UpdateRooms/UpdateRooms";

const ViewRoom = () => {
  const [isAddRoomsOpen, setIsAddRoomsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  const showModal = (roomId) => {
    setIsModalOpen(true);
    setCurrentRoomId(roomId);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setCurrentRoomId(null);
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

  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  //--------FETCH HOTEL INFO-------------
  const { data: hotelInfo } = useQuery("hoteldetails", () => getHotel(token));
  const hotelId = hotelInfo?.data.id;

  // --------FETCH ROOM INFO-------------
  const { data: roomInfo } = useQuery(
    "roomdetails",
    () => findAllRooms(hotelId, token),
    {
      enabled: !!hotelId, // Only fetch if hotelId is available
    }
  );
  const tableData = roomInfo?.data;

  const toggleAddRooms = () => {
    setIsAddRoomsOpen(!isAddRoomsOpen);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId, token);
      queryClient.invalidateQueries("roomdetails");

      // Optimistically update the frontend state by removing the deleted room
      queryClient.setQueryData("roomdetails", (oldData) =>
        oldData.filter((room) => room.id !== roomId)
      );

      // Optionally, you can refetch the data to ensure consistency with the backend
      await queryClient.refetchQueries("roomdetails");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Image",
      key: "images",
      dataIndex: "images",
      render: (images) => (
        <>
          {images.map((image, index) => (
            <img
              key={index}
              src={`${BACKEND_URL}/static/rooms/${image}`}
              alt="Service"
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </>
      ),
    },
    {
      title: "Room Name",
      dataIndex: "room_name",
      key: "room_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "Room Type",
      dataIndex: "room_type",
      key: "room_type",
    },
    {
      title: "Room Capacity",
      dataIndex: "room_capacity",
      key: "room_capacity",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record.id)}>Edit</Button>
          <Modal
            title="Update Rooms"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            footer={null}
          >
            <UpdateRooms roomId={currentRoomId} />
          </Modal>
          <Popconfirm
            title="Delete the room"
            description="Are you sure to delete this room?"
            onConfirm={() => handleDeleteRoom(record.id)}
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
      <div className={styles.roominfo}>
        <div className={styles.titles}>
          <span>
            <h3>Room Information</h3>
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
        </div>
        <div className={styles["view-tables"]}>
          <Table columns={columns} rowKey={"id"} dataSource={tableData} />
        </div>
      </div>
    </>
  );
};
export default ViewRoom;
