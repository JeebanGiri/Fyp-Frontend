import { useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from "../../../../constants/constant";
import styles from "./ViewRoom.module.css";
import { Space, Table } from "antd";
import { deleteRoom, findAllRooms, getHotel } from "../../../../constants/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import AddRoomsPopup from "../AddRoomsForms/AddRoomsPopup";
import { useState } from "react";

const ViewRoom = () => {
  const [isAddRoomsOpen, setIsAddRoomsOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  //--------FETCH HOTEL INFO-------------
  const { data: hotelInfo } = useQuery("hoteldetails", () => getHotel(token));
  console.log(hotelInfo, "hotelinfo");

  const hotelId = hotelInfo?.data[0]?.id;
  console.log(hotelId, "hotelid");

  // --------FETCH ROOM INFO-------------
  const { data: roomInfo } = useQuery("roomdetails", () =>
    findAllRooms(hotelId, token)
  );

  console.log(roomInfo, "infos");

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
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>Edit</a>

          <Popconfirm
            title="Delete the room"
            description="Are you sure to delete this room?"
            onConfirm={() => handleDeleteRoom(record.id)}
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

  const tableData = roomInfo?.data;
  console.log(tableData, "rrom dateil");

  return (
    <>
      <div className={styles.roominfo}>
        <div className={styles.titles}>
          <span>
            <h3>Room Information</h3>
          </span>
          <span className={styles["add-room"]}>
            <button onClick={() => toggleAddRooms()}>Add Rooms</button>
            {isAddRoomsOpen ? (
              <AddRoomsPopup
                toggle={() => toggleAddRooms()}
                hotelId={hotelId}
              />
            ) : null}
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
