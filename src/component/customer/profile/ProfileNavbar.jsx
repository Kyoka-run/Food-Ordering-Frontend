import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/authActions";

const tabs = [
  { path: "my-profile", label: "Profile", icon: <AccountCircleIcon /> },
  { path: "orders", label: "Orders", icon: <ShoppingBagIcon /> },
  { path: "favorites", label: "Favorites", icon: <FavoriteIcon /> },
  { path: "address", label: "Address", icon: <HomeIcon /> },
  { path: "events", label: "Events", icon: <EventIcon /> },
];

const ProfileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPath = location.pathname.split("/").pop();
  const value = tabs.some(tab => tab.path === currentPath) ? currentPath : "my-profile";

  const handleChange = (event, newPath) => {
    if (newPath === "logout") {
      dispatch(logoutUser(navigate));
      navigate("/");
    } else {
      navigate(`/my-profile/${newPath === "my-profile" ? "" : newPath}`);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      position: 'sticky',
      top: '64px', 
      backgroundColor: 'white',
      zIndex: 40,
      borderBottom: 1,
      borderColor: 'divider'
    }}
    data-testid="profile-navbar">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTab-root': {
            minHeight: '48px',
            textTransform: 'none'
          }
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.path}
            value={tab.path}
            label={
              <div className="flex items-center space-x-2">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            }
            data-testid={`tab-${tab.path}`}
          />
        ))}
        <Tab
          value="logout"
          label={
            <div className="flex items-center space-x-2 text-red-500">
              <LogoutIcon />
              <span>Logout</span>
            </div>
          }
          data-testid="tab-logout"
        />
      </Tabs>
    </Box>
  );
};

export default ProfileNavbar;