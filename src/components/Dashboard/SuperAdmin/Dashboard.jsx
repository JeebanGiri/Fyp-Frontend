import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import styles from "./Dashboard.module.css";
import Title from "./Title";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import {
  approveHotel,
  deleteHotel,
  getAllHotel,
  getTotalPrice,
} from "../../../constants/Api";
import { Navigate } from "react-router-dom";

export default function Dashboards() {
  const jwt = localStorage.getItem("token");
  const [hotelData, setHotelData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedHotelId, setSelectedHotelId] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // --------GET ALL HOTEL DETAILS----------
  const { refetch: refetchHotelInfo } = useQuery(
    "hotel-info",
    () => getAllHotel(jwt),
    {
      onSuccess: (data) => {
        setHotelData(data?.data?.hotels || []);
      },
    }
  );

  const { data: getBookingPrice } = useQuery("get-amount", () =>
    getTotalPrice(jwt)
  );

  console.log(getBookingPrice);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleApprove = async (hotelId, jwt) => {
    try {
      const response = await approveHotel(hotelId, jwt);
      const message = response.data.message;
      toast.success(message);
      refetchHotelInfo();
    } catch (error) {
      const errorMsg =
        error.response.data.message || error.response.data.error.message;

      if (Array.isArray(errorMsg)) {
        errorMsg.forEach((err) => toast.error(err));
      } else if (errorMsg) {
        if (errorMsg === "Hotel Already Approved") {
          toast.warn("This hotel is already approved!");
        } else {
          toast.error(errorMsg);
        }
      }
    }
  };

  const handleDelete = async (hotelId, jwt) => {
    try {
      const response = await deleteHotel(hotelId, jwt);
      const message = response.data.message;
      toast.success(message);
      refetchHotelInfo();
    } catch (error) {
      console.log(error.response);
      const errorMsg =
        error.response.data.message || error.response.data.error.message;
      if (Array.isArray(errorMsg)) {
        errorMsg.forEach((err) => toast.error(err));
      } else if (errorMsg) {
        toast.error(errorMsg);
      }
    }
  };

  const handleMenuOpen = (event, hotelId) => {
    setAnchorEl(event.currentTarget);
    setSelectedHotelId(hotelId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === "approve") {
      handleApprove(selectedHotelId, jwt);
    } else if (action === "edit") {
      <Navigate to="" />;
    } else if (action === "delete") {
      setConfirmOpen(true);
    }
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    // Handle delete action
    handleDelete(selectedHotelId, jwt);
    setConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Title>Recent Activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Hotel Name</TableCell>
            <TableCell>Hotel Address</TableCell>
            <TableCell align="left">Hotel Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotelData ? (
            hotelData.map((hotels) => (
              <TableRow key={hotels.id}>
                <TableCell>{formatDate(hotels.created_at)}</TableCell>
                <TableCell>{hotels.user.full_name}</TableCell>
                <TableCell>{hotels.name}</TableCell>
                <TableCell>{hotels.address}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={hotels.status === "APPROVED" ? "success" : "warning"}
                    onClick={() => handleApprove(hotels.id, jwt)}
                    sx={{
                      minWidth: "80px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {hotels.status}
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <MoreVertIcon
                    onClick={(event) => handleMenuOpen(event, hotels.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleMenuItemClick("approve")}>
                      <Button
                        variant="contained"
                        sx={{
                          height: "35px",
                          minWidth: "80px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: "green",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "darkgreen",
                          },
                        }}
                      >
                        Approve
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("edit")}>
                      <Button
                        variant="contained"
                        sx={{
                          minWidth: "80px",
                          backgroundColor: "blue",
                          color: "white",
                          height: "35px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: "darkblue",
                          },
                        }}
                      >
                        Update
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("delete")}>
                      <Button
                        variant="contained"
                        sx={{
                          minWidth: "80px",
                          height: "35px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: "red",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "darkred",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <div>No hotel data available</div>
          )}
        </TableBody>
      </Table>

      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more Details
      </Link>

      <Dialog
        open={confirmOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this hotel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            autoFocus
            variant="contained"
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
