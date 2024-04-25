import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./ListItems";
import { AccountCircle } from "@mui/icons-material";
import SuperAdminProfile from "./SuperAdminProfile";
import SuperAdminNotification from "./SuperAdminNotification";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SuperAdminNavbar() {
  const [open, setOpen] = React.useState(true);
  const [showProfileBox, setShowProfileBox] = React.useState(false);
  const [showNotificationBox, setShowNotificationBox] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (showProfileBox && showNotificationBox) {
      // Attach click event listener to handle clicks outside of the modal
      document.addEventListener("click", handleClickOutside);
      // document.addEventListener('click', handleClickOutside);
    } else {
      // Remove the event listener when the modal is closed
      document.removeEventListener("click", handleClickOutside);
      // document.removeEventListener('click', handleClickOutside);
    }

    // Cleanup function to remove the event listener
    return () => {
      // document.removeEventListener('click', handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfileBox, showNotificationBox]);

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".profile-box") ||
      !event.target.closest(".notification-box")
    ) {
      // Close both the profile and notification boxes (modals)
      setShowProfileBox(false);
      setShowNotificationBox(false);
    } else if (event.target.closest(".profile-box")) {
      // Close only the profile box (modal)
      setShowProfileBox(false);
    } else if (event.target.closest(".notification-box")) {
      // Close only the notification box (modal)
      setShowNotificationBox(false);
    }
  };

  const handleProfileClick = (e) => {
    // Prevent the click event from propagating to document level
    e.preventDefault();
    e.stopPropagation();
    // Toggle the profile box (modal)
    setShowProfileBox(!showProfileBox);
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();
    // Prevent the click event from propagating to document level
    e.stopPropagation();
    // Toggle the profile box (modal)
    setShowNotificationBox(!showNotificationBox);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              {/* badgeContent={4} */}
              <Badge color="secondary">
                <NotificationsIcon onClick={handleNotificationClick} />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle onClick={handleProfileClick} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        {showProfileBox && (
          <div id="profile-box">
            <SuperAdminProfile />
          </div>
        )}
        {showNotificationBox && (
          <div id="notification-box">
            <SuperAdminNotification />
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}
